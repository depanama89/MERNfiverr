export const verifyToken = ()=>{
    const token = req.cookies.accessToken

    jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{
        if(err) return resizeBy.status(403).send("Token is not valid!")
        req.userId = payload.id;
        req.isSeller = payload.isSeller;

    })
}