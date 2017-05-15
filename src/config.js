const defaults = {
    render: 'server',
    csrftoken: 'csrftoken',
    porterNodeIdentifier: 'data-porter-node',
    buildTrigger: 'VirtualDomBuildTrigger',
    debug: false,
}
// TODO:
// - Document addition of PorterConfig
export const getConfig = () => {
    const extendDefault = typeof PorterConfig
    let xdConfig

    if (extendDefault === 'undefined') { xdConfig = {} }
    else { xdConfig = PorterConfig }


    return Object.assign(defaults, xdConfig)
}

export const CONFIG = getConfig()