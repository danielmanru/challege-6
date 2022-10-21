const controllers = require('../controllers/index');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

describe('biodata.createBiodata unit test', () => {
    //case success
    test("res.json called with{status:true, message:success, data: Createuser}", async () => {
        try {
            const req = mockRequest({ name: "valen", gender: "female", region: "indonesia", phone: "089876789898" });
            const res = mockResponse();
            await controllers.biodata.create(req, res);

            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: "success",
                data: Createuser,
            });

            done();
        } catch (err) {

        }
    });
});
describe('biodata.showBiodata unit test', () => {
    //case success
    test("res.json called with{status:true, message:success, data: userBiodata}", async () => {
        try {
            const req = mockRequest();
            const res = mockResponse();
            const userBiodata = await user_game_biodata.findOne({ where: { id_user: 6 } })
            await controllers.biodata.show(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: userBiodata
            });

            done();
        } catch (err) {

        }
    });
});
describe('biodata.updateBiodata unit test', () => {
    //case success
    test("res.json called with{status:true, message:Update data success, data: hasil}", async () => {
        try {
            const req = mockRequest({ name: "valen1", gender: "female", region: "indonesia", phone: "089876789898" });
            const res = mockResponse();
            await controllers.biodata.update(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: "Update data success",
                data: hasil,
            });

            done();
        } catch (err) {

        }
    });
});
describe('biodata.deleteBiodata unit test', () => {
    //case success
    test("res.json called with{status:success, message:Delete data success}", async () => {
        try {
            const req = mockRequest();
            const res = mockResponse();
            await controllers.biodata.deleter(req, res);
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
