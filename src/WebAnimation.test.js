// @flow

import WebAnimation from './WebAnimation';
import type { OptionsType, ProgressType } from './WebAnimation';

describe('WebAnimation', () => {
    let animation: WebAnimation;

    describe('constructor', () => {
        it('should create instance with default params when options are not provided', () => {
            animation = new WebAnimation();

            expect(animation._duration).toEqual(1000);
            expect(animation._startTime).toEqual(0);
            expect(animation._isStopped).toBeTruthy();

            expect(typeof animation._easing).toEqual('function');
            expect(typeof animation._rAF).toEqual('function');

            expect(animation._onStep).toBeNull();
            expect(animation._onStop).toBeNull();
            expect(animation._onFinish).toBeNull();
        });

        it('should define params from options', () => {
            const options: OptionsType = {
                duration: 42,
                easing: jest.fn(),
                rAF: jest.fn(),
                onStop: jest.fn(),
                onStep: jest.fn(),
                onFinish: jest.fn(),
            };
            animation = new WebAnimation(options);

            expect(animation._duration).toEqual(42);
            expect(animation._easing).toEqual(options.easing);
            expect(animation._rAF).toEqual(options.rAF);

            expect(animation._onStep).toEqual(options.onStep);
            expect(animation._onStop).toEqual(options.onStop);
            expect(animation._onFinish).toEqual(options.onFinish);
        });

        it('should use default easing function when it is not provided', () => {
            animation = new WebAnimation();
            const easing = animation._easing;
            const strEasing = Function.prototype.toString.call(easing)
                .replace(/\r|\n/g, '')
                .replace(/(^ +)|( +$)/g, '')
                .replace(/ {2,}/g, ' ');
            expect(strEasing).toEqual('function easing(n) { return n; }');
        });

        it('should allow to use 0 for duration', () => {
            animation = new WebAnimation({
                duration: 0,
            });
            expect(animation._duration).toEqual(0);
        });
    });

    describe('setOnStop', () => {
        beforeEach(() => {
            animation = new WebAnimation();
        });

        it('should use function as param', () => {
            const func = jest.fn();
            animation.setOnStop(func);
            expect(animation._onStop).toEqual(func);
        });

        it('should use null as param', () => {
            animation._onStop = jest.fn();
            animation.setOnStop(null);
            expect(animation._onStop).toBeNull();
        });

        it('should use null as param if param is not provided', () => {
            animation._onStop = jest.fn();
            animation.setOnStop();
            expect(animation._onStop).toBeNull();
        });
    });

    describe('setOnStep', () => {
        beforeEach(() => {
            animation = new WebAnimation();
        });

        it('should use function as param', () => {
            const func = jest.fn();
            animation.setOnStep(func);
            expect(animation._onStep).toEqual(func);
        });

        it('should use null as param', () => {
            animation._onStep = jest.fn();
            animation.setOnStep(null);
            expect(animation._onStep).toBeNull();
        });

        it('should use null as param if param is not provided', () => {
            animation._onStep = jest.fn();
            animation.setOnStep();
            expect(animation._onStep).toBeNull();
        });
    });

    describe('setOnFinish', () => {
        beforeEach(() => {
            animation = new WebAnimation();
        });

        it('should use function as param', () => {
            const func = jest.fn();
            animation.setOnFinish(func);
            expect(animation._onFinish).toEqual(func);
        });

        it('should use null as param', () => {
            animation._onFinish = jest.fn();
            animation.setOnFinish(null);
            expect(animation._onFinish).toBeNull();
        });

        it('should use null as param if param is not provided', () => {
            animation._onFinish = jest.fn();
            animation.setOnFinish();
            expect(animation._onFinish).toBeNull();
        });
    });

    describe('stop', () => {
        beforeEach(() => {
            animation = new WebAnimation();
        });

        it('should do nothing if it is stopped already', () => {
            animation._onStop = jest.fn();
            animation._isStopped = true;
            animation.stop();
            expect(animation._onStop).not.toHaveBeenCalled();
        });

        it('should stop animation', () => {
            animation._onStop = jest.fn();
            animation._isStopped = false;
            animation.stop();
            expect(animation._isStopped).toBeTruthy();
        });

        it('should call onStop callback', () => {
            animation._onStop = jest.fn();
            animation._isStopped = false;
            animation.run();
            animation.stop();
            expect(animation._onStop).toHaveBeenCalled();
            expect(animation._onStop.mock.calls[0][1]).toEqual(animation);
            const progress = animation._onStop.mock.calls[0][0];
            expect(progress).toHaveProperty('elapsedTime');
            expect(progress).toHaveProperty('ratio');
            expect(progress).toHaveProperty('tween');
            expect(progress).toHaveProperty('isFinished');
        });
    });

    describe('run', () => {
        beforeAll(() => {
            Date.now = jest.fn(() => 42);
        });

        afterAll(() => {
            delete Date.now;
        });

        beforeEach(() => {
            animation = new WebAnimation();
            animation._rAF = jest.fn();
            animation.run();
        });
        it('should unstop animation', () => {
            expect(animation._isStopped).toBeFalsy();
        });

        it('should update start time of animation', () => {
            expect(animation._startTime).toEqual(42);
        });

        it('should call tick function for animation', () => {
            expect(animation._rAF).toHaveBeenCalledWith(animation._onTick);
        });
    });

    describe('getProgress', () => {
        beforeAll(() => {
            Date.now = jest.fn(() => 2100);
        });

        afterAll(() => {
            delete Date.now;
        });

        beforeEach(() => {
            animation = new WebAnimation();
            animation._startTime = 2000;
            animation._easing = jest.fn(n => n * n);
        });

        it('should return progress object', () => {
            const progress = animation.getProgress();
            expect(progress).toHaveProperty('elapsedTime');
            expect(progress).toHaveProperty('ratio');
            expect(progress).toHaveProperty('tween');
            expect(progress).toHaveProperty('isFinished');
        });

        it('should return elapsedTime', () => {
            const progress = animation.getProgress();
            expect(progress.elapsedTime).toEqual(100);
        });

        it('should return ratio', () => {
            const progress = animation.getProgress();
            expect(progress.ratio.toFixed(4)).toEqual('0.1000');
        });

        it('should return max value 1 for ratio when animation is finished', () => {
            animation._startTime = 100;
            const progress = animation.getProgress();
            expect(progress.ratio).toEqual(1);
            expect(progress.isFinished).toBeTruthy();
        });

        it('should use easing and return tween', () => {
            const progress = animation.getProgress();
            expect(progress.tween.toFixed(4)).toEqual('0.0100');
        });

        it('should return isFinished = false if animation is not finished', () => {
            const progress = animation.getProgress();
            expect(progress.isFinished).toBeFalsy();
        });

        it('should return isFinished = true if animation is finished', () => {
            animation._startTime = 100;
            const progress = animation.getProgress();
            expect(progress.isFinished).toBeTruthy();
        });
    });

    describe('_onTick', () => {
        let progress;

        beforeEach(() => {
            animation = new WebAnimation();
            animation._onStep = jest.fn();
            animation._onFinish = jest.fn();
            animation._rAF = jest.fn();
            animation._isStopped = false;
            progress = {
                elapsedTime: 42,
                ratio: 1,
                tween: 1,
                isFinished: true,
            };
            animation.getProgress = jest.fn(() => progress);
        });

        it('should do nothing if animation is stopped', () => {
            animation._isStopped = true;
            animation._onTick();

            expect(animation.getProgress).not.toHaveBeenCalled();
            expect(animation._onStep).not.toHaveBeenCalled();
            expect(animation._onFinish).not.toHaveBeenCalled();
            expect(animation._rAF).not.toHaveBeenCalled();
        });

        it('should get progress of animation', () => {
            animation._onTick();
            expect(animation.getProgress).toHaveBeenCalled();
        });

        it('should call onStep with progress data', () => {
            animation._onTick();
            expect(animation._onStep).toHaveBeenCalledWith(progress, animation);
        });

        it('should call onFinish with progress data if animation is finished', () => {
            animation._onTick();
            expect(animation._onFinish).toHaveBeenCalledWith(progress, animation);
            expect(animation._isStopped).toBeTruthy();
        });

        it('should not call _rAF if animation is finished', () => {
            animation._onTick();
            expect(animation._rAF).not.toHaveBeenCalled();
        });

        it('should not call _onFinish if animation is not finished', () => {
            progress.isFinished = false;
            animation._onTick();
            expect(animation._onFinish).not.toHaveBeenCalled();
            expect(animation._isStopped).toBeFalsy();
        });

        it('should call _rAF if animation is not finished', () => {
            progress.isFinished = false;
            animation._onTick();
            expect(animation._rAF).toHaveBeenCalled();
        });
    });

});
