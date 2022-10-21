const controllers = require('../controllers/index');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

describe('history.createhistory unit test', () => {
    //case success
    test("res.json called with{status:true, message:success, data: Createhistory}", async () => {
        try {
            const req = mockRequest({ date: "2022-10-21", time: "18:53:01", score: 70 });
            const res = mockResponse();
            await controllers.history.create(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: Createhistory
            });

            done();
        } catch (err) {

        }
    });
});
describe('history.showHistory unit test', () => {
    //case success
    test("res.json called with{status:true, message:success, data: userHistory}", async () => {
        try {
            const req = mockRequest();
            const res = mockResponse();
            await controllers.history.show(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: userHistory
            });

            done();
        } catch (err) {

        }
    });
});
describe('history.updateHistory unit test', () => {
    //case success
    test("res.json called with{status:success, message:Update data success, data: hasil}", async () => {
        try {
            const req = mockRequest({ date: "2022-10-20", time: "18:53:01", score: 70 });
            const res = mockResponse();
            await controllers.history.update(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: "success",
                message: "Update data success",
                data: hasil
            });

            done();
        } catch (err) {

        }
    });
});
describe('history.deleteBiodata unit test', () => {
    //case success
    test("res.json called with{status:success, message:Delete data success}", async () => {
        try {
            const req = mockRequest();
            const res = mockResponse();
            await controllers.history.deleter(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: "success",
                message: "Delete data success",
            });

            done();
        } catch (err) {

        }
    });
});
