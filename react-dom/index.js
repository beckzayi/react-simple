import Component from '../react/component';

const ReactDOM = {
	render
};

function render(vnode, selector) {
	return selector.appendChild(_render(vnode));
}

// Return a DOM, node object
// vnode is a JSX
function _render(vnode) {
	if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
		// return;
		vnode = '';
	}

	if (typeof vnode === 'number') {
		vnode = String(vnode);
	}

	if (typeof vnode === 'string') {
		return (document.createTextNode(vnode));
	}

	const { tag, attrs, children } = vnode;

	// 如果tag是函数, 则渲染组件
	if (typeof tag === 'function') {
		// 1. 创建组件
		const component = createComponent(tag, attrs);

		// 2. 设置组件的属性
		setComponentProps(component, attrs);

		// 3. 组件渲染的节点对象返回
		return component.base;
	}

	const newDom = document.createElement(tag);

	if (attrs) { // attrs might be null
		Object.keys(attrs).forEach(key => {
			setAttribute(newDom, key, attrs[key]);
		});
	}

	if (children) {
		children.forEach(child => {
			render(child, newDom); // recursive
		});
	}

	return (newDom);
}

function createComponent(comp, props) {
	let instance;
	if (comp.prototype && comp.prototype.render) {
		// 如果是类定义的组件, 则创建实例 返回
		instance = new comp(props);
	} else {
		// 如果是函数组件, 将函数组件转化成类组件
		instance = new Component(props);
		instance.constructor = comp;

		// 定义render函数
		instance.render = function() {
			return this.constructor(props); // return a JSX
		};
	}

	return instance;
}

function setComponentProps(comp, props) {
	// base 还未在 renderComponent() 中被挂载
	if (!comp.base) {
		if (comp.componentWillMount) {
			comp.componentWillMount();
		}
	} else if (comp.componentWillReceiveProps) {
		comp.componentWillReceiveProps();
	}

	// 设置组件的属性
	comp.props = props;

	// 渲染组件
	renderComponent(comp);
}

function renderComponent(comp) {
	const renderer = comp.render(); // return a JSX object
	let base;
	base = _render(renderer); // return a js node object

	if (comp.base && comp.componentWillUpdate) {
		comp.componentWillUpdate();
	}

	if (comp.base) {
		if (comp.componentDidUpdate) {
			comp.componentDidUpdate();
		}
	} else if (comp.componentDidMount) {
		comp.componentDidMount();
	}

	comp.base = base; // 挂载到base这个属性上
}

function setAttribute(dom, key, value) {
	if (key === 'className') {
		key = 'class';
	}

	// Event onClick onBlur
	if (/on\w+/.test(key)) {
		key = key.toLowerCase();
		dom[key] = value || '';
	} else if (key === 'style') {
		if (!value || typeof value === 'string') {
			dom.style.cssText = value || '';
		} else if (value && typeof value === 'object') {
			// { width: 20 }
			for (let key in value) {
				if (typeof value[key] === 'number') {
					dom.style[key] = value[key] + 'px';
				} else {
					dom.style[key] = value[key];
				}
			}
		}
	} else {
		if (value) {
			dom.setAttribute(key, value);
		} else {
			dom.removeAttribute(key);
		}
	}
}

export default ReactDOM;
