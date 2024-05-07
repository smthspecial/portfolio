import { css, useTheme } from "@emotion/react";
import { Event } from "../type";
import { Popover } from "react-tiny-popover";
import { useState } from "react";
import { getYearsAndMonthsInRange } from "../util";
import { MONTHS } from "../constants";

interface TimelineProps {
  events: Event[];
  headerComponent?: (title: string) => React.ReactNode;
  bodyComponent?: (title: string) => React.ReactNode;
  footerComponent?: (title: string) => React.ReactNode;
}

const EventItem = ({
  event: { body, color, footer, header, percentage },
  headerComponent,
  bodyComponent,
  footerComponent,
}: {
  event: Event;
  headerComponent?: (title: string) => React.ReactNode;
  bodyComponent?: (title: string) => React.ReactNode;
  footerComponent?: (title: string) => React.ReactNode;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const theme = useTheme();

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom"]}
      transform={{ top: 10 }}
      transformMode="relative"
      containerStyle={{ zIndex: "10" }}
      content={
        <div
          css={css`
            min-width: 250px;
            overflow: hidden;
            position: relative;
            background-color: #ffffff;
            text-align: left;
            border-radius: 0.5rem;
            max-width: 290px;
            box-shadow: 0 20px 25px 0px rgba(0, 0, 0, 0.1),
              0 10px 10px 0px rgba(0, 0, 0, 0.1);
          `}
        >
          <div
            css={css`
              padding: 4px 12px;
            `}
          >
            {headerComponent ? headerComponent(header) : header}
          </div>
          <div
            css={css`
              padding: 4px 12px;
            `}
          >
            {bodyComponent ? bodyComponent(body) : body}
          </div>
          <div
            css={css`
              padding: 4px 12px;
            `}
          >
            {footerComponent ? footerComponent(footer) : footer}
          </div>
        </div>
      }
    >
      <div
        css={css`
          background-color: ${theme.colors[color][300]};
          flex-basis: ${percentage}%;
          display: flex;
          height: 100px;
          cursor: pointer;
          border-radius: 0.5rem;
          justify-content: center;
          align-items: center;
        `}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        {header}
      </div>
    </Popover>
  );
};

export const Timeline = ({ events }: TimelineProps) => {
  const sortedEvents = events.sort((a, b) => a.startDate - b.startDate);

  const eventsBeginning = sortedEvents[0].startDate;
  const eventsEnding = [...events].sort((a, b) => b.endDate - a.endDate)[0]
    .endDate;

  const divideEvents = (events: Event[]): Event[][] => {
    // Function to calculate percentage and merge events into arrays
    const mergeEvents = (acc: Event[][], event: Event): Event[][] => {
      // Find the array in acc where the event can be added
      const index = acc.findIndex((existingEvents) => {
        const lastEvent = existingEvents[existingEvents.length - 1];
        return (
          event.startDate >= lastEvent.endDate ||
          event.endDate <= lastEvent.startDate
        );
      });

      // Calculate percentage based on the event's date range
      const range = event.endDate - event.startDate;
      event.percentage =
        (range /
          (sortedEvents[sortedEvents.length - 1].endDate -
            sortedEvents[0].startDate)) *
        100;

      // Calculate percentage from start based on the event's startDate
      const rangeFromStart = event.startDate - sortedEvents[0].startDate;
      event.percentageFromStart =
        (rangeFromStart /
          (sortedEvents[sortedEvents.length - 1].endDate -
            sortedEvents[0].startDate)) *
        100;

      // If no suitable array found, create a new one
      if (index === -1) {
        return [...acc, [event]];
      } else {
        // Add the event to the suitable array
        return acc.map((existingEvents, i) =>
          i === index ? [...existingEvents, event] : existingEvents,
        );
      }
    };
    // Use reduce to merge events into arrays
    return events.reduce(mergeEvents, []);
  };

  return (
    <div
      css={css`
        width: 100%;
        position: relative;
      `}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 110%;
            z-index: 1;
          `}
        >
          {getYearsAndMonthsInRange(
            new Date(eventsBeginning - MONTHS * 2),
            new Date(eventsEnding + MONTHS * 2),
          ).map(({ month, year }) => {
            if (month === 0) {
              return (
                <div
                  css={css`
                    width: 2px;
                    height: 97%;
                    background-color: black;
                    display: flex;
                    align-items: flex-end;
                    margin-bottom: auto;
                  `}
                >
                  <div css={css`
                    top: 6px;
                    position: relative;
                    left: 4px;
                  `}>
                  {year}

                  </div>
                </div>
              );
            }
            if (month % 2 === 0) {
              return (
                <div
                  css={css`
                    width: 2px;
                    height: 94%;
                    background-color: grey;
                    margin-bottom: auto;
                  `}
                ></div>
              );
            }
          })}
        </div>

        {divideEvents(sortedEvents).map((events) => (
          <div
            css={css`
              display: flex;
              position: relative;
              z-index: 2;
              margin: 8px 0;
              padding: 0 1.75%;
            `}
          >
            <div
              css={css`
                flex-basis: ${events[0].percentageFromStart}%;
              `}
            ></div>
            {events.map((event) => (
              <EventItem event={event} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
