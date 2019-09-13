import React from './react';
import ReactDOM from './react-dom';
import Component from './react/component';

const ele = (
	<div className='active' title='my title'>
		Hello, <span style="color: navy">React</span>
	</div>
);

function Home() {
	return (
		<div className="active" title="123">Home Content</div>
	);
};

const title = 'Welcome';

// class Home extends Component {
// 	render() {
// 		return (
// 			<div>Home Content</div>
// 		);
// 	}
// }

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

