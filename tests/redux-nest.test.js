import {proxy} from '../src/redux-nest';

describe('redux-nest', () => {

    it('Should be able to return a Proxy instance when accessing a non-existent property;', () => {

        const model = proxy({ name: 'Adam', age: 30 });

        expect(model.name.toString()).toEqual('Adam');
        expect(Number(model.age.toString())).toEqual(30);

        expect(model.location.toString()).toBeUndefined();
        expect(model.location.name.toString()).toBeUndefined();
        expect(model.location.name.short.toString()).toBeUndefined();

        model.location = { name: { short: 'Ldn' } };
        expect(model.location.name.short.toString()).toEqual('Ldn');

    });

});
