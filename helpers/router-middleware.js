export function auth ({ next, store, nextMiddleware }) {
    if (!store.getters['account/loggedIn']) {
        return next({
            name: 'login'
        })
    }
    return nextMiddleware()
}

export function admin ({ next, store, nextMiddleware }) {
    if (store.state.account.user.role_id === 1) {
      return nextMiddleware();
    }
    return next({ name: 'pageNotFound' });
}

export function user ({ next, store, nextMiddleware }) {
    if (store.state.account.user.role_id === 2) {
      return nextMiddleware();
    }
    return next({ name: 'pageNotFound' });
}

export function instructor ({ next, store, nextMiddleware }) {
  if (store.state.account.user.role_id === 3) {
    return nextMiddleware();
  }
  return next({ name: 'pageNotFound' });
}

export function sharedAdminInstr ({ next, store, nextMiddleware }) {
  if (store.state.account.user.role_id === 1 || store.state.account.user.role_id === 3) {
    return nextMiddleware();
  }
  return next({ name: 'pageNotFound' });
}

export function middlewarePipeline (context, middleware, index) {
    const nextMiddleware = middleware[index]
    if (!nextMiddleware) {
        return context.next 
    }
    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        );
        nextMiddleware({ ...context, nextMiddleware: nextPipeline })
    }
}


