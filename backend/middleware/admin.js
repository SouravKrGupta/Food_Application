const adminMiddleware = (req, res, next) => {
    if (req.body.userRole !== 'admin') {
        return res.json({ success: false, message: "Access denied. Admin role required." });
    }
    next();
};

export default adminMiddleware;