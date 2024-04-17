import React, {useState, useEffect} from "react";
import { useScheduleContext } from "./context/ScheduleContext";
import { getBaseUrl } from "../../utils";
import styles from "./Schedule.module.css";
import moment from "moment";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { InputGroup, Row, Col, Form, Modal, Button } from "react-bootstrap";

const CreateNewModal = () => {
    
    const [loading1, setLoading1] = useState(0);
    const [participantsList, setparticipants] = useState([]);
    const [relatedDepartments, setRelatedDepartments] = useState([]);
    const [priority, setPriority] = useState();
    const [recurring, setRecurring] = useState(1);
    const [scheduledDate, setScheduledDate] = useState(
        moment().add(1, "days").format("YYYY-MM-DD")
    );
    const [scheduledStartTime, setStartTime] = useState(
    moment("10:00", "hh:mm").format("hh:mm")
    );
    const [scheduledEndTime, setEndTime] = useState(
        moment("10:00", "hh:mm").format("hh:mm")
    );
    const [scheduledLocation, setScheduledLocation] = useState("");
    const priorities = [
        { key: "1", label: "LOW" },
        { key: "2", label: "NORMAL" },
        { key: "3", label: "HIGH" },
      ];
    const [agenda, setAgenda] = useState([]);
    const [agendaTo, setAgendaTo] = useState("All Members");
    const [agendaDes, setAgendaDes] = useState("Description");
    const addAgenda = () => {
        const a = agenda;
        a.push({ assignedTo: agendaTo, description: agendaDes });
        setAgendaDes("");
        setAgendaTo("");
        setAgenda(a);
    };

    const animatedComponents = makeAnimated();
    
    const {
        meetingGroups, setMeetingGroups,
        actionType, setType,
        depArr, setDepArr,
        optionsArray, setArray,
        show, setShow,
    } = useScheduleContext();

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setLoading1(0);
      };

      const handleSubmit = (e) => {
        setLoading1(1);
        e.preventDefault();
        var object = {};
    
        const formData = new FormData(e.target);
        console.log("Initial Form Data")
        for(var pair1 of formData.entries()) {
          console.log(pair1[0] + " : " + pair1[1]);
        }
        // console.log(formData);
        formData.forEach((value, key) => {
          if (key != "participants") {
            object[key] = value;
          }
        });
        
        object["groupMembers"] = participantsList;
        // object['scheduledTime'] =
        if (actionType != 3) {
          object["committeeName"] = object["Name"];
          object["groupType"] = actionType - 1;
          object["relatedDepartmentId"] = relatedDepartments;
          delete object.type;
          delete object.Name;
          if (
            !object["groupMembers"].find(
              (val) => val == parseInt(object["memberSecretary"])
            )
          ) {
            object["groupMembers"].push(parseInt(object["memberSecretary"]));
          }
          object["isRecurring"] = object["isRecurring"] == "on";
    
          fetch(getBaseUrl() + "schedule/createMeetingGroup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(object),
          })
            .then((data) => {
              // console.log(data.json());
              console.log("post success")
              return data.json();
            })
            .then((data) => {
              console.log(data);
              alert("Meeting Group Created");
              setType(1);
              setAgenda();
              setPriority();
              handleClose();
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (actionType == 3) {
          object["agenda"] = JSON.stringify(agenda);
          object["meetingSubject"] = object["Name"];
          object["scheduledStartTime"] = scheduledDate + " " + scheduledStartTime + ":00";
          object["scheduledEndTime"] = scheduledDate + " " + scheduledEndTime + ":00";
          // console.log(scheduledDate+" "+scheduledTime+":00")
          delete object.Name;
          object["priority"] = priority.key;
          // console.log(object);
          console.log("Object")
          for(var pair2 in object) {
            console.log(pair2 + " : " + object[pair2]);
          }
          fetch(getBaseUrl() + "schedule/createMeeting", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(object),
          })
            .then((data) => {
              // console.log("hemang")
              console.log(data);
              return data.json();
            })
            .then((data) => {
              console.log(data);
              alert("Meeting Created");
    
              handleClose();
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };

      const changeParticipants = (e) => {
        let v = participantsList;
        // v.push(e.value);
        // setparticipants(v);
        console.log(e);
        let obj = [];
        if (e != null) {
          e.map((item) => {
            obj.push(item.value);
          });
        }
        console.log(obj);
        setparticipants(obj);
      };

      const changeRelatedDepartments = (e) => {
        const v = relatedDepartments;
        console.log(e);
        let obj = [];
        if (e != null) {
          e.map((item) => {
            obj.push(item.value);
          });
        }
        console.log(obj);
        setRelatedDepartments(obj);
      };


      // add all meeting groups into meetingGroups useState
  useEffect(() => {
    if (actionType == 3) {
      fetch(getBaseUrl() + "schedule/getMeetingGroups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((data) => {
          //   console.log(data.json());
          return data.json();
        })
        .then((data) => {
          console.log(data);
          const val = [];
          data.data.map((item) => {
            val.push({ value: item.meeting_group_id, label: item.title });
          });
          // console.log(val);
          setMeetingGroups(val);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [actionType]);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>Create New</Modal.Header>
            {loading1 ? (
            <center>
                <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </center>
            ) : (
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Select
                    name="type"
                    style={{ marginTop: "10px" }}
                    value={actionType}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value={1}>Create New Meeting Group</option>
                    <option value={2}>Create Ad hoc Meeting</option>
                    <option value={3}>Create New Meeting</option>
                </Form.Select>
                <Form.Control
                    style={{ marginTop: "10px" }}
                    name="Name"
                    placeholder={
                    actionType != 3
                        ? "Name Of Meeting Group"
                        : "Meeting Subject"
                    }
                />
                {actionType == 3 ? (
                    <>
                    <Row style={{ marginTop: "10px" }}>
                        <Col md={6}>
                        {/* {actionType=='Ad hoc' || actionType=='' */}
                        Schedule of meet
                        {/* <>Schedule of Meet</>  */}
                        <Form.Control
                            className="col-md-5"
                            name="scheduledDate"
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                        />
                        </Col>
                        <Col md={6}>
                        Location of meet
                        {/* <>Time of Meet</> */}
                        <Form.Control
                            className="col-md-5"
                            name="scheduledLocation"
                            type="text"
                            value={scheduledLocation}
                            onChange={(e) => setScheduledLocation(e.target.value)}
                            placeholder="Enter Location"
                        />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                        <Col md={6}>
                        {/* {actionType=='Ad hoc' || actionType=='' */}
                        Start time
                        {/* <>Schedule of Meet</>  */}
                        <Form.Control
                            className="col-md-5"
                            name="scheduledStartTime"
                            type="time"
                            value={scheduledStartTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            placeholder="Enter Start Time"
                        />
                        </Col>
                        <Col md={6}>
                        End Time
                        {/* <>Time of Meet</> */}
                        <Form.Control
                            className="col-md-5"
                            name="scheduledEndTime"
                            type="time"
                            value={scheduledEndTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            placeholder="Enter End Time"
                        />
                        </Col>
                    </Row>
                    <Select
                        className="mt-3"
                        name="groupId"
                        type="text"
                        placeholder="Select Meeting Group"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        options={meetingGroups}
                    />
                    <Select
                        className="mt-3"
                        name="priority"
                        type="text"
                        placeholder={"Priority"}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        options={priorities}
                        value={priority}
                        onChange={(e) => setPriority(e)}
                    />
                    <table className="head mt-3">
                        <thead>
                        <tr
                            style={{
                            background: "#39CCCC",
                            color: "white",
                            }}
                        >
                            <th className="tb">Assigned To</th>
                            <th className="tb">Description</th>
                        </tr>
                        </thead>
                        <tr>
                        <th className="tb">
                            <Form.Control
                            name="agendaTo"
                            type="text"
                            value={agendaTo}
                            onChange={(e) =>
                                setAgendaTo(e.target.value)
                            }
                            />
                        </th>
                        <th className="tb">
                            <Form.Control
                            type="text"
                            name="agendaDes"
                            value={agendaDes}
                            onChange={(e) =>
                                setAgendaDes(e.target.value)
                            }
                            />
                        </th>
                        </tr>
                        {agenda.map((item) => {
                        return (
                            <tr>
                            <th className="tb">{item.assignedTo}</th>
                            <th className="tb">{item.description}</th>
                            </tr>
                        );
                        })}
                    </table>
                    <Button
                        style={{
                        marginTop: "10px",
                        background: "#39cccc",
                        border: "none",
                        }}
                        onClick={addAgenda}
                    >
                        Add
                    </Button>
                    </>
                ) : (
                    <>
                    <Row>
                        <Col>
                        <Form.Label style={{ margin: "10px 0 0 20px" }}>
                            Is Recurring
                        </Form.Label>
                        </Col>
                        <Col>
                        <Form.Check
                            name="isRecurring"
                            type={"checkbox"}
                            checked={recurring}
                            onChange={(e) => setRecurring(!recurring)}
                            style={{ margin: "10px 0px" }}
                        />
                        </Col>
                    </Row>
                    {recurring ? (
                        <Form.Control
                        placeholder="Recurring Time (in Days)"
                        name="recurringTime"
                        type="number"
                        />
                    ) : (
                        <></>
                    )}
                    <Select
                        className="mt-2"
                        name="groupMembers"
                        placeholder="Select Members"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        // value={participantsList}
                        isMulti
                        onChange={changeParticipants}
                        options={optionsArray}
                    />
                    <Select
                        className="mt-2"
                        name="memberSecretary"
                        placeholder="Member Secretary"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        // value={participantsList}
                        // onChange={chnageMemberSecretary}
                        options={optionsArray}
                    />
                    <Select
                        className="mt-2"
                        name="relatedDepartmentId"
                        placeholder="Select Related Departments"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        onChange={changeRelatedDepartments}
                        options={depArr}
                    />
                    </>
                )}
                {/* <Form.Control style={{marginTop:'10px'}}  /> */}

                {/* <DropdowfnMultiselect name='participants' placeholder='Participants' options={optionsArray}/> */}
                <Row className={styles.saveChangesBtnRow}>
                    <Col md="4">
                    <Button
                        variant="primary"
                        style={{
                        marginTop: "20px",
                        backgroundColor: "#39cccc",
                        border: "none",
                        }}
                        type="submit"
                    >
                        Save Changes
                    </Button>
                    </Col>
                </Row>
                </Form>
            </Modal.Body>
            )}
        </Modal>
    );
}

export default CreateNewModal;