describe('subPub Test', function () {
    var subscription = 'test:subscription',
        publishDetected = 0,
        mockMemo = 'some data',
        memoReceived = false,
        handler = function () { publishDetected++; };
        handler2 = function (memo) { 
            publishDetected++;
            if (memo === mockMemo) {
                memoReceived = true;
            }
        };

    beforeEach(function () {
        publishDetected = 0;
        memoReceived = false;
    });

    it('should be able to subscribe', function () {

        expect(subscription in subPub.registry).toEqual(false);
        
        subPub.subscribe(subscription, handler);

        expect(subscription in subPub.registry).toEqual(true);
        expect(subPub.registry[subscription].length).toEqual(1);

        subPub.subscribe(subscription, handler2);

        expect(subscription in subPub.registry).toEqual(true);
        expect(subPub.registry[subscription].length).toEqual(2);
    });

    it('should throw an TypeError exception if callback is not a function', function () {
        expect(function () {subPub.subscribe(subscription, 'test'); }).toThrow(new TypeError('callback is expected to be a function.'));
    });

    it('should be able to publish', function () {
        var handled = false;

        subPub.publish(subscription, mockMemo);

        expect(publishDetected).toEqual(2);
        expect(memoReceived).toEqual(true);
    });

    it('should be able to unsubscribe handlers', function () {
        expect(subPub.registry[subscription].length).toEqual(2);

        subPub.unsubscribe(subscription); 

        expect(subPub.registry[subscription].length).toEqual(0);
    });

    it('should be able to unsubscribe specific callbacks', function () {
        subPub.subscribe(subscription, handler);
        subPub.subscribe(subscription, handler2);
        subPub.subscribe(subscription, handler);
        subPub.subscribe(subscription, handler2);

        expect(subPub.registry[subscription].length).toEqual(4);
        console.log(subPub.registry);
        
        subPub.unsubscribe(subscription, handler2);

        expect(subPub.registry[subscription].length).toEqual(2);

        subPub.publish(subscription, mockMemo);

        expect(publishDetected).toEqual(2);
        expect(memoReceived).toEqual(false);
    });

    // This test tests to make sure that subPub returns
    // the window.subPub variable back to a previous object
    // to play nice. The variable is written in the SpecRunner.html
    it('should provide a noConflict mechanism', function () {
        window.sp = subPub.noConflict();

        expect(window.subPub).toEqual('test');
        expect(window.sp).not.toEqual('undefined');
    });
});
