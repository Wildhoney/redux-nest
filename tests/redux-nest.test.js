import {create, proxy, isDefined, isUndefined} from '../src/redux-nest';

let model, person;

beforeEach(() => {
    person = { name: 'Adam', age: 30 };
    model  = create(person);
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

    it('Should be able to package functionality into a valid Redux middleware component;', () => {

        const middleware = proxy();

        expect(typeof middleware).toEqual('function');
        expect(middleware.length).toEqual(1);

        expect(typeof middleware()).toEqual('function');
        expect(middleware().length).toEqual(1);

        const obj = { next: () => {} };
        spyOn(obj, 'next').and.callThrough();

        middleware(obj.next)(person);
        expect(obj.next).toHaveBeenCalled();

    });

});
