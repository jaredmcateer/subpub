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
});
