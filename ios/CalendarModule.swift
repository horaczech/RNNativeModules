import Foundation
import EventKit
import React

@objc(Calendar)
class CalendarModule: RCTEventEmitter {

  private var hasListeners = false
  private var resolve: RCTPromiseResolveBlock?
  private var reject: RCTPromiseRejectBlock?

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["EventAdded"]
  }

  override func startObserving() {
    hasListeners = true
  }
  override func stopObserving() {
    hasListeners = false
  }

  @objc(addEvent:location:resolver:rejecter:)
  func addEvent(name: String, location: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    self.resolve = resolve
    self.reject = reject

    let eventStore = EKEventStore()

    switch EKEventStore.authorizationStatus(for: .event) {
    case .authorized:
      insertEvent(store: eventStore, title: name, location: location)
    case .denied:
      reject("Event not added", "Access to calendar is denied", nil)
    case .notDetermined:
      eventStore.requestAccess(to: .event, completion:
        {[weak self] (granted: Bool, error: Error?) -> Void in
          if granted {
            self?.insertEvent(store: eventStore, title: name, location: location)
          } else {
            reject("Event not added", "Access to calendar is denied", nil)
          }
        })
    default:
      reject("Event not added", "Access to calendar is not determined", nil)
    }
  }

  func insertEvent(store: EKEventStore, title: String, location: String) {
    let event:EKEvent = EKEvent(eventStore: store)
    
    event.title = title
    event.location = location
    event.startDate = Date()
    event.endDate = event.startDate.addingTimeInterval(2 * 60 * 60) // 2 hours long meeting
    event.calendar = store.defaultCalendarForNewEvents

    do {
      try store.save(event, span: .thisEvent)
      if hasListeners {
        sendEvent(withName: "EventAdded", body: ["name": title, "location": location])
      }
      resolve?(true)
    } catch {
      reject?("Event not added", "An error occurred", error)
    }
  }
}
