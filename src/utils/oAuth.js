export const oAuthConfig = {
  //请求授权地址
  userAuthorizationUri: import.meta.env.VITE_USER_AUTHORIZATION_URL,
  //accessToken请求地址
  accessTokenUri: `https://linksso-test.yuexiu.com/sso/oauth2/token`,
  //用户信息请求地址
  userInfoUri: `https://linksso-test.yuexiu.com/sso/oauth2/userinfo`,
  //登出请求地址
  logoutUri: `https://linksso-test.yuexiu.com/sso/oauth2/logout`,
  //项目地址
  localuri: `http://192.168.1.102:5173/`,
  redirect_uri: import.meta.env.VITE_REDIRECT_URL,
  //案例资源服务器地址
  resUri: `http://localhost:3000`,
  //客户端相关标识，请从认证服务器申请
  clientId: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  //申请的权限范围
  scope: `user`,
  //可选参数，客户端的当前状态，可以指定任意值，用于校验，此次案例不做相关认证
  state: `analysis`,
  //一些固定的请求参数
  response_type: `code`,
  grant_type: `authorization_code`,
  code: ``
}

export const loginUrl = () => {
  let authorUrl = oAuthConfig.userAuthorizationUri
  authorUrl = authorUrl + `?` + `client_id=` + oAuthConfig.clientId
  authorUrl = authorUrl + `&` + `response_type=` + oAuthConfig.response_type
  authorUrl = authorUrl + `&` + `scope=` + oAuthConfig.scope
  authorUrl = authorUrl + `&` + `state=` + oAuthConfig.state
  authorUrl = authorUrl + `&` + `redirect_uri=` + oAuthConfig.redirect_uri
  window.location.href = authorUrl
}
