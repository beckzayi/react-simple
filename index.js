import React from './react';
import ReactDOM from './react-dom';

const ele = (
	<div className='active' title='my title'>
		Hello, <span style="color: navy">React</span>
	</div>
);

// function Home() {
// 	return (
// 		<div className="active" title="123">Home Content</div>
// 	);
// };

const title = 'Welcome';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 0
		};
	}

	componentWillMount() {
		console.log('Component Will Mount');
	}

	componentWillReceiveProps() {
		console.log('Component Will Receive Props');
	}

	componentWillUpdate() {
		console.log('Component Will Update');
	}

	componentDidUpdate() {
		console.log('Component Did Update');
	}

	componentDidMount() {
		console.log('Component Did Mount');
	}

	handleClick() {

	}

	render() {
		return (
			<div className="active" title="123">
				Home Content <span>class based</span>
				<button onClick={this.handleClick.bind(this)}>Change</button>
				<div>Number: {this.state.num}</div>
			</div>
		);
	}
}

// console.log(ele);

// console.log('JSX', <Home title='Welcome'><span>inner</span></Home>)

// ReactDOM.render(ele, document.querySelector('#root'));
ReactDOM.render(<Home name={title}></Home>, document.querySelector('#root'));

/*
var ele = React.createElement("div", {
  className: "active",
  title: "my title"
}, "Hello, ", React.createElement("span", null, "React"));
*/

