const Post = require('models/post');
const Joi = require('joi');

const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params;

    // 검증 실패
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; // 400 Bad Request
        return null;
    }

    return next(); // next를 리턴해주어야 ctx.body가 제대로 설정됩니다.
};

/*
  POST /api/posts
  { title, body, tags }
*/
exports.write = async (ctx) => {

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title, body, tags
    });

    try {
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(e, 500);
    }
};

/*
  GET /api/posts
*/
exports.list = async (ctx) => {
    // page가 주어지지 않았다면 1로 간주
    // query는 문자열 형태로 받아오므로 숫자로 변환
    const page = parseInt(ctx.query.page || 1, 10);

    // 잘못된 페이지가 주어졌다면 오류
    if (page < 1) {
        ctx.status = 400;
        return;
    }

    try {
        const posts = await Post.find()
            .sort({ _id: -1 })
            .limit(10)
            .skip((page - 1) * 10)
            .lean()
            .exec();
        const postCount = await Post.countDocuments().exec();
        const limitBodyLength = post => ({
            ...post,
            body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
        });
        ctx.body = posts.map(limitBodyLength);
        // 마지막 페이지 알려주기
        // ctx.set은 response header를 설정해줍니다.
        ctx.set('Last-Page', Math.ceil(postCount / 10));
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
  GET /api/posts/:id
*/
exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(e, 500);
    }
};

/*
  DELETE /api/posts/:id
*/
exports.remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndDelete(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(e, 500);
    }
};

/*
  PATCH /api/posts/:id
  { title, body, tags }
*/
exports.update = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
            // 이 값을 설정해 주어야 업데이트된 객체를 반환합니다.
            // 설정하지 않으면 업데이트되기 전의 객체를 반환합니다.
        }).exec();
        // 포스트가 존재하지 않을 시
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(e, 500);
    }
};