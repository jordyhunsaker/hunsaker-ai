"use client";

import { useState, useMemo } from "react";

// Configure your availability here
const CONFIG = {
  timezone: "America/Los_Angeles",
  availableDays: [1, 2, 3, 4, 5], // Monday = 1, Sunday = 0
  startHour: 9,
  endHour: 17,
  slotDurationMinutes: 30,
  bufferMinutes: 0,
  meetingTitle: "Strategy Call with Jordy Hunsaker",
  meetingDuration: 30,
};

type TimeSlot = {
  time: Date;
  formatted: string;
};

type BookingInfo = {
  name: string;
  email: string;
  company: string;
  notes: string;
};

function generateICS(slot: Date, info: BookingInfo): string {
  const endTime = new Date(slot.getTime() + CONFIG.meetingDuration * 60 * 1000);

  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@hunsaker.ai`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hunsaker.ai//Booking//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(slot)}
DTEND:${formatDate(endTime)}
SUMMARY:${CONFIG.meetingTitle}
DESCRIPTION:Booked by ${info.name} (${info.email})${info.company ? `\\nCompany: ${info.company}` : ""}${info.notes ? `\\nNotes: ${info.notes}` : ""}
ORGANIZER;CN=Jordy Hunsaker:mailto:jordy@hunsaker.ai
ATTENDEE;CN=${info.name}:mailto:${info.email}
END:VEVENT
END:VCALENDAR`;
}

function downloadICS(slot: Date, info: BookingInfo) {
  const icsContent = generateICS(slot, info);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "strategy-call.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getWeekDays(startDate: Date): Date[] {
  const days: Date[] = [];
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  // Find Monday of this week
  const dayOfWeek = start.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  start.setDate(start.getDate() + mondayOffset);

  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  return days;
}

function getTimeSlotsForDay(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const dayOfWeek = date.getDay();

  if (!CONFIG.availableDays.includes(dayOfWeek)) {
    return slots;
  }

  const now = new Date();

  for (let hour = CONFIG.startHour; hour < CONFIG.endHour; hour++) {
    for (let minute = 0; minute < 60; minute += CONFIG.slotDurationMinutes) {
      const slotTime = new Date(date);
      slotTime.setHours(hour, minute, 0, 0);

      // Skip past times
      if (slotTime <= now) continue;

      slots.push({
        time: slotTime,
        formatted: slotTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      });
    }
  }

  return slots;
}

function formatDayHeader(date: Date): { dayName: string; dayNumber: string; month: string } {
  return {
    dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
    dayNumber: date.getDate().toString(),
    month: date.toLocaleDateString("en-US", { month: "short" }),
  };
}

export default function Book() {
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    name: "",
    email: "",
    company: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const navigateWeek = (direction: number) => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + direction * 7);

    // Don't allow navigating to past weeks
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newStart < today && direction < 0) {
      return;
    }

    setWeekStart(newStart);
    setSelectedSlot(null);
  };

  const handleSubmit = async () => {
    if (!selectedSlot || !bookingInfo.name || !bookingInfo.email) return;

    setIsSubmitting(true);

    // Simulate API call / send notification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Download ICS file
    downloadICS(selectedSlot, bookingInfo);

    setIsComplete(true);
    setIsSubmitting(false);
  };

  const canSubmit = selectedSlot && bookingInfo.name && bookingInfo.email;

  if (isComplete && selectedSlot) {
    return (
      <main className="min-h-screen bg-dark-900 py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <a href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </a>

          <div className="mt-12 gradient-border rounded-lg p-8 bg-dark-800">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terminal-green/20 mb-6">
              <span className="text-terminal-green text-3xl">&#10003;</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-4">You're Booked</h1>

            <div className="bg-dark-700 rounded-lg p-4 mb-6">
              <p className="font-mono text-terminal-green text-lg">
                {selectedSlot.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-mono text-terminal-cyan text-xl">
                {selectedSlot.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="text-gray-400 text-sm mt-2">{CONFIG.meetingDuration} minutes</p>
            </div>

            <p className="text-gray-400 mb-6">
              A calendar invite has been downloaded. Add it to your calendar to confirm the meeting.
            </p>

            <p className="text-gray-400 mb-8">
              You'll receive a confirmation email at <span className="text-gray-200">{bookingInfo.email}</span> with meeting details.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => downloadICS(selectedSlot, bookingInfo)}
                className="px-6 py-3 border border-terminal-green text-terminal-green font-semibold rounded-lg hover:bg-terminal-green/10 transition-colors"
              >
                Download Again
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-terminal-green text-dark-900 font-semibold rounded-lg hover:bg-terminal-green/90 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <a href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </a>
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">Book a Strategy Call</h1>
          <p className="text-gray-400">
            {CONFIG.meetingDuration} minutes to discuss your AI goals and explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="gradient-border rounded-lg bg-dark-800 overflow-hidden">
              {/* Week navigation */}
              <div className="flex items-center justify-between p-4 border-b border-dark-600">
                <button
                  onClick={() => navigateWeek(-1)}
                  className="p-2 text-gray-400 hover:text-terminal-green transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="font-mono text-gray-200">
                  {weekDays[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <button
                  onClick={() => navigateWeek(1)}
                  className="p-2 text-gray-400 hover:text-terminal-green transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-dark-600">
                {weekDays.map((day, i) => {
                  const { dayName, dayNumber } = formatDayHeader(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isAvailable = CONFIG.availableDays.includes(day.getDay());

                  return (
                    <div
                      key={i}
                      className={`p-3 text-center ${!isAvailable ? "opacity-40" : ""}`}
                    >
                      <div className="text-xs text-gray-500 uppercase">{dayName}</div>
                      <div
                        className={`text-lg font-mono mt-1 ${
                          isToday
                            ? "text-terminal-green"
                            : isAvailable
                            ? "text-gray-200"
                            : "text-gray-600"
                        }`}
                      >
                        {dayNumber}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time slots */}
              <div className="grid grid-cols-7 gap-px bg-dark-600">
                {weekDays.map((day, dayIndex) => {
                  const slots = getTimeSlotsForDay(day);
                  const isAvailable = CONFIG.availableDays.includes(day.getDay());

                  return (
                    <div key={dayIndex} className="bg-dark-800 min-h-64 p-2">
                      {!isAvailable ? (
                        <div className="h-full flex items-center justify-center">
                          <span className="text-gray-600 text-xs">Unavailable</span>
                        </div>
                      ) : slots.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                          <span className="text-gray-600 text-xs">No slots</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {slots.map((slot, slotIndex) => {
                            const isSelected =
                              selectedSlot?.getTime() === slot.time.getTime();
                            return (
                              <button
                                key={slotIndex}
                                onClick={() => setSelectedSlot(slot.time)}
                                className={`w-full py-1.5 px-1 text-xs font-mono rounded transition-colors ${
                                  isSelected
                                    ? "bg-terminal-green text-dark-900"
                                    : "bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-terminal-green"
                                }`}
                              >
                                {slot.formatted}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="lg:col-span-2">
            <div className="gradient-border rounded-lg p-6 bg-dark-800 sticky top-24">
              {selectedSlot ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-1">Selected time</p>
                    <p className="font-mono text-terminal-green">
                      {selectedSlot.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="font-mono text-terminal-cyan text-xl">
                      {selectedSlot.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Name *</label>
                      <input
                        type="text"
                        value={bookingInfo.name}
                        onChange={(e) =>
                          setBookingInfo((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        value={bookingInfo.email}
                        onChange={(e) =>
                          setBookingInfo((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Company</label>
                      <input
                        type="text"
                        value={bookingInfo.company}
                        onChange={(e) =>
                          setBookingInfo((prev) => ({ ...prev, company: e.target.value }))
                        }
                        placeholder="Company name"
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        What would you like to discuss?
                      </label>
                      <textarea
                        value={bookingInfo.notes}
                        onChange={(e) =>
                          setBookingInfo((prev) => ({ ...prev, notes: e.target.value }))
                        }
                        placeholder="Brief description of your AI goals..."
                        rows={3}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-green focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit || isSubmitting}
                      className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                        canSubmit && !isSubmitting
                          ? "bg-terminal-green text-dark-900 hover:bg-terminal-green/90"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? "Confirming..." : "Confirm Booking"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-2">
                    <svg
                      className="w-12 h-12 mx-auto mb-4 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400">Select a time slot to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
