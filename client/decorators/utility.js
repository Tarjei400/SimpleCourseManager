export function injectProperties(target, name, descriptor) {
    const oldFunction = descriptor.value;

    descriptor.value = () => {
        return oldFunction.bind(this)(this.props);
    };

    return descriptor;
}
