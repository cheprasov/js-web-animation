//@flow strict

export type OptionsType = {
    duration: ?number,
    easing: ?Function,
    rAF: ?Function,
    onStep: ?Function,
    onStop: ?Function,
    onFinish: ?Function,
};

export type ProgressType = {
    elapsedTime: number,
    ratio: number,
    tween: number,
    isFinished: boolean,
};

export default class WebAnimation {

    _duration: number;
    _startTime: number = 0;
    _isStopped: boolean = true;
    _easing: Function;
    _rAF: Function;

    _onStop: ?Function;
    _onStep: ?Function;
    _onFinish: ?Function;

    constructor(options: OptionsType = {}) {
        this._duration = options && options.duration || 1000;
        this._rAF = options && options.rAF || window.requestAnimationFrame.bind(window);
        this._easing = options && options.easing || (n => n);

        this._onStep = options && options.onStep || null;
        this._onStop = options && options.onStop || null;
        this._onFinish = options && options.onFinish || null;

        this._onTick = this._onTick.bind(this);
    }

    setOnStop(onStop: ?Function = null) {
        this._onStop = onStop;
    }

    setOnStep(onStep: ?Function = null) {
        this._onStep = onStep;
    }

    setOnFinish(onFinish: ?Function = null) {
        this._onFinish = onFinish;
    }

    stop() {
        if (this._isStopped) {
            return;
        }
        this._isStopped = true;
        if (this._onStop) {
            const progress = this.getProgress();
            this._onStop(progress, this);
        }
    }

    run() {
        this._isStopped = false;
        this._startTime = Date.now();

        this._rAF(this._onTick);
    }

    getProgress(): ProgressType {
        const elapsedTime = Date.now() - this._startTime;
        const isFinished = elapsedTime >= this._duration;
        const ratio = Math.min(1, elapsedTime / this._duration);
        const tween = this._easing(ratio);
        return { elapsedTime, ratio, tween, isFinished };
    }

    /**
     * @private
     */
    _onTick() {
        if (this._isStopped) {
            return;
        }

        const progress = this.getProgress();
        if (this._onStep) {
            this._onStep(progress, this);
        }

        if (progress.isFinished) {
            this._isStopped = true;
            if (this._onFinish) {
                this._onFinish(progress, this);
            }
            return;
        }

        this._rAF(this._onTick);
    }

}