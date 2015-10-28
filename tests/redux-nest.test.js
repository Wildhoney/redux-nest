import {proxy, isDefined, isUndefined} from '../src/redux-nest';

let model;

beforeEach(() => {
    model = proxy({ name: 'Adam', age: 30 });
});

describe('redux-nest', () => {

    it('Should be able to return a Proxy instance when accessing a non-existent property;', () => {

        expect(model.name.toString()).toEqual('Adam');
        expect(Number(model.age.toString())).toEqual(30);

        expect(model.location.toString()).toBeUndefined();
        expect(model.location.name.toString()).toBeUndefined();
        expect(model.location.name.short.toString()).toBeUndefined();

        model.location = { name: { short: 'Ldn' } };
        expect(model.location.name.short.toString()).toEqual('Ldn');

    });

    it('Should be able to determine when a value is undefined and defined;', () => {
        expect(isDefined(model.name)).toBeTruthy();
        expect(isDefined(model.age)).toBeTruthy();
        expect(isDefined(model.location)).toBeFalsy();
        expect(isUndefined(model.dateOfBirth)).toBeTruthy();
        expect(isUndefined(model.dateOfBirth.year)).toBeTruthy();
    });

});
