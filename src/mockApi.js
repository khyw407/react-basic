import MockAdapter from 'axios-mock-adapter';

export default instance => {
    let mock = new MockAdapter(instance);
    let log = (req, res) => console.log({
        url: req.url,
        mockRes: res,
        req,
    });
    let rep = resOrFunc => async req => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let res = resOrFunc;
        if (typeof resOrFunc === 'function') {
        res = await resOrFunc(req);
        }
        if (!res) throw Error('EMPTY_RES');
        log(req, res);
        return [200, res];
    };

    mock.onGet('/category').reply(rep(require('./mock-data/category.json')));
    
    mock.onAny().passThrough();
};