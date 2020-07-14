declare global {
    interface Window {
        {{#with redux}}
        __REDUX_DEVTOOLS_EXTENSION__: any
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
        {{/with}}
    }
}

export { }