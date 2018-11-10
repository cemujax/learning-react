## 컴포넌트 라이프사이클

### - 마운트

constructor -> getDerivedStateFromProps -> render -> ComponentDidMount

### - 업데이트

getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate

### - 언마운트

componentWillUnmount
