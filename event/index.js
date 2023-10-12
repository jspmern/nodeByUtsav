let event =require('events')
let eventEmitter=new event.EventEmitter()
//1
//  eventEmitter.on('saymyname',()=>{
//     console.log('hello i am event saymyname')
//  })
//  eventEmitter.emit('saymyname')
//  eventEmitter.emit('saymyname')


//2
// eventEmitter.on('saymyname',()=>{
//     console.log('hello utsav')
// })

// eventEmitter.on('saymyname',()=>{
//     console.log('hello vicky')
// })

// eventEmitter.on('saymyname',()=>{
//     console.log('hello ashish')
// })
 
// eventEmitter.emit('saymyname')

//3 (from here you can able to pass argument also)
function print(arg1,arg2)
{
    console.log(`hii this side ${arg1} and ${arg2}`)
}
eventEmitter.on('saymyname',print)
eventEmitter.on('saymyname2',print)

eventEmitter.emit('saymyname','utsav','jha')
let x=eventEmitter.eventNames()   //it is return how many event is registor
console.log(x)
let y=eventEmitter.getMaxListeners()  //Give the maximum amount of listeners that can be added to an EventEmitter object which by default is 10 but can be increased or decreased by using setMaxListeners()
console.log(y)
eventEmitter.setMaxListeners(50)
let z=eventEmitter.getMaxListeners()   
console.log(y)
//you can also remove event also
//eventEmitter.off('saymyname',print)   //remove event from here we are not getting any output
//eventEmitter.emit('saymyname','utsav','jha')














// emitter.addListener(event, listener)	Adds a listener to the end of the listeners array for the specified event. No checks are made to see if the listener has already been added.
// emitter.on(event, listener)      	    Adds a listener to the end of the listeners array for the specified event. No checks are made to see if the listener has already been added. It can also be called as an alias of emitter.addListener()
// emitter.once(event, listener)    	    Adds a one time listener for the event. This listener is invoked only the next time the event is fired, after which it is removed.
// emitter.removeListener(event, listener)	 Removes a listener from the listener array for the specified event. Caution: changes array indices in the listener array behind the listener.
// emitter.removeAllListeners([event])	     Removes all listeners, or those of the specified event.
// emitter.setMaxListeners(n)      	     By default EventEmitters will print a warning if more than 10 listeners are added for a       particular event.
// emitter.getMaxListeners()	             Returns the current maximum listener value for the emitter which is either set by emitter.setMaxListeners(n)                       or defaults to EventEmitter.defaultMaxListeners.
// emitter.listeners(event)	             Returns a copy of the array of listeners for the specified event.
// emitter.emit(event[, arg1][, arg2][, ...])	Raise the specified events with the supplied arguments.
// emitter.listenerCount(type)               	Returns the number of listeners listening to the type of event.


