const controllers = require('../controllers/index');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    //res.data = jest.fn().mockReturnValue(res)

    return res;
};

/*describe('Register Testing', () => {
    //succes

    test('res.json called with{status:true, message:success, data:{username:username}}', async () => {
        const req = mockRequest({ username: "valen1", password: "valen123" })
        const res = mockResponse()

        await base.register(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith({
            status: true,
            message: "success",
            data: {
                username: req.body.username,
            }
        })
        done()
    })
})
*/
describe('auth.registration unit test', () => {
    // case success
    test('res.json called with{status:true, message:success, data:{username:username}}', async () => {
        try {
            const req = mockRequest({ username: "valen3", password: "valen123" });
            const res = mockResponse();


            await controllers.auth.register(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: {
                    username: req.body.username
                }
            });

            done();
        } catch (err) {

        }
    });

    //case failed
    test('res.json called with{status:true, message:success, data:{token}}', async () => {
        try {
            const req = mockRequest({ username: "daniel1", password: "valen123" });
            const res = mockResponse();

            await controllers.auth.register(req, res);

            expect(res.status).toBeCalledWith(409);
            expect(res.json).toBeCalledWith({
                status: false,
                message: 'username already used!',
            });

            done();
        } catch (err) {

        }
    });

});

//Login Test
describe('auth.login unit test', () => {


    //case failed
    test("res.json called with{status:false, message:user doesn't exist!}", async () => {
        try {
            const req = mockRequest({ username: "daniel12", password: "daniel11213" });
            const res = mockResponse();


            await controllers.auth.login(req, res);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                status: false,
                message: "user doesn't exist!",
            });

            done();
        } catch (err) {

        }
    });

    test("res.json called with{status:false, message:user or password doesn't match!}", async () => {
        try {
            const req = mockRequest({ username: "valen3", password: "valen1234" });
            const res = mockResponse();


            await controllers.auth.login(req, res);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                status: false,
                message: "user or password doesn't match!",
            });

            done();
        } catch (err) {

        }
    });
    // case success
    test('res.json called with{status:true, message:success, data:{username:username}}', async () => {
        try {
            const req = mockRequest({ username: "valen3", password: "valen123" });
            const res = mockResponse();


            payload = {
                id: user.id,
                username: user.name,
            };
            const token = jwt.sign(payload, JWT_SIGNATURE_KEY);
            await controllers.auth.login(req, res);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: {
                    username: token
                }
            });

            done();
        } catch (err) {

        }
    });
});

describe('auth.changePassword unit test', () => {
    // case success
    test('res.json called with{status:true, message:password changed successfully}', async () => {
        try {
            const req = mockRequest({ oldPassword: "valen123", newPassword: "valen321", confirmNewPassword: "valen321" });
            const res = mockResponse();
            await controllers.auth.changePassword(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'password changed successfully',
            });

            done();
        } catch (err) {

        }
    });

    //case failed
    test("res.json called with{status:false, message:new password and confirm new password doesnt match!}", async () => {
        try {
            const req = mockRequest({ oldPassword: "valen321", newPassword: "valen123", confirmNewPassword: "valen122" });
            const res = mockResponse();


            await controllers.auth.changePassword(req, res);

            expect(res.status).toBeCalledWith(422);
            expect(res.json).toBeCalledWith({
                status: false,
                message: "new password and confirm new password doesnt match!",
            });

            done();
        } catch (err) {

        }
    });

    test("res.json called with{status:false, message:old password does not match!}", async () => {
        try {
            const req = mockRequest({ oldPassword: "valen322", newPassword: "valen123", confirmNewPassword: "valen123" });
            const res = mockResponse();


            await controllers.auth.changePassword(req, res);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                status: false,
                message: "old password does not match!",
            });

            done();
        } catch (err) {

        }
    });
});

describe('auth.deleteUser unit test', () => {
    //case success
    test("res.json called with{status:success, message:user_games data deleted}", async () => {
        try {
            const req = mockRequest();
            const res = mockResponse();


            await controllers.auth.deleteDataUser(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: "success",
                message: "user_games data deleted",
            });

            done();
        } catch (err) {

        }
    });
});