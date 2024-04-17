import React, { useState, useEffect } from "react";
import styles from "./Schedule.module.css";
import { useScheduleContext } from "./context/ScheduleContext";
import { Link } from "react-router-dom";
import moment from "moment";
import { getBaseUrl } from "../../utils";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const UpcomingMeetings = () => {
    const [page, setPage] = React.useState(1);
    const [total_pages, setTotal] = useState(0);
    const [loading, setLoading] = useState(1);

    const {
        upcoming, setUpcoming,
        events, setEvents,
    } = useScheduleContext();

    const changePage = (page_number) => {
        if (page_number < 1 || page_number > total_pages) {
            return 0;
        } else {
            setPage(page_number);
            handleChange(page_number);
        }
    };

    const handleChange = (value) => {
        setLoading(1);
        setPage(value);
        fetch(getBaseUrl() + "schedule/getFutureMeetings?limit=5&page1=" + value, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((data) => {
            console.log(data);
            // console.log(data.result);
            return data.json();
          })
          .then((data) => {
            setLoading(0);
            setUpcoming(data.data.content);
            const calanderEvents = [];
            data.data.content.map((item) => {
              const meeting = {};
              meeting.start = item.start_date_time;
              meeting.title = item.title;
              meeting.id = item.id;
              let backgroundColor = "#B31121";
              if (item.priority == 1) {
                backgroundColor = "#E1D71D";
              } else if (item.priority == 2) {
                backgroundColor = "#25991B";
              }
              meeting.backgroundColor = backgroundColor;
              calanderEvents.push(meeting);
              console.log(
                moment(item.start_date_time).add(moment.duration(1, "hours"))
              );
              // meeting.end=
            });
            setEvents(calanderEvents);
            setTotal(data.data.total_pages);
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <>
          <div className={styles.topRightDivContainer}>
            <h3>Upcoming Meetings</h3>  
            <div className={styles.upcommingMeetingsDiv}>
                {upcoming &&
                upcoming.map((item) => {
                    let backgroundColor = "#B31121";
                    if (item.priority == 1) {
                    backgroundColor = "#E1D71D";
                    } else if (item.priority == 2) {
                    backgroundColor = "#25991B";
                    }
                    const meetingID = item.id;
                    return (
                    <div
                    style={{
                        color: "black",
                        background: backgroundColor,
                        height: "13vh",
                        width: "80%",
                        marginTop: "20px",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                    >
                    <p className="h4">{item.title}</p>
                    <Link to={`/user/schedule/updatemeeting/${meetingID}`}>Update meeting</Link>
                    <p style={{ justifyContent: "space-between", display: "flex" }}>
                        <span>{item.title} </span>
                        <span>
                        {moment(new Date(item.start_date_time)).format("lll")}
                        </span>
                        <span>
                        {item.priority == 1 ? (
                            <>LOW</>
                        ) : item.priority == 2 ? (
                            <>MEDIUM</>
                        ) : (
                            <>HIGH</>
                        )}
                        </span>
                    </p>
                    </div>
                    );
                })}
                <div
                className="col-sm-8"
                style={{
                    // paddingLeft: "0px",
                    // display: "flex",
                    alignItems: "center",
                }}
                >
                <button
                    onClick={(e) => changePage(page - 1)}
                    style={{ border: "none", background: "none" }}
                >
                    <AiOutlineLeft size={20} />
                </button>
                <span style={{ fontSize: "20px" }}>{page}</span>
                <button
                    onClick={(e) => changePage(page + 1)}
                    style={{ border: "none", background: "none" }}
                >
                    <AiOutlineRight size={20} />
                </button>
                <span>Total Pages:{total_pages} </span>
                </div>
            </div>
          </div>
        </>
    );
}

export default UpcomingMeetings;