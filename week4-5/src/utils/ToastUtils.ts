const toastEventManager = {
  list: new Map(),

  on(event: any, callback: any) {
    // tslint:disable-next-line: no-unused-expression
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event).push(callback);
    return this;
  },
  off(event: any) {
    this.list.delete(event);
    return this;
  },
  emit(event: any, ...args: any[]) {
    // tslint:disable-next-line: no-unused-expression
    this.list.has(event) &&
      this.list.get(event).forEach((callback: any) =>
        setTimeout(() => {
          callback(...args);
          // tslint:disable-next-line: align
        }, 0)
      );
  }
};

export { toastEventManager };
