const roleGuard = (...allowedRoles) => {
    return (req, res, next) => {
        // auth.guard already set req.user
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: 'Access denied: insufficient permissions'
            });
        }

        next();
    };
};

module.exports = roleGuard;