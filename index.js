// index.js
import ExpressService from './ExpressService.js';

const service = new ExpressService();
service.appLoggingMiddleware();
service.addLoginRoutes();
service.addLogoutRoute();  // Add the logout route
service.addSignUpRoutes(); // Add the sign-up routes

service.app.listen(ExpressService.PORT, () => {
    console.log(`Server running in ${ExpressService.NODE_ENV} mode on port ${ExpressService.PORT}`);
});
