import React, { useState } from "react";
import { InputGroup, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useScheduleContext } from './context/ScheduleContext';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import moment from "moment";

const CreateMeetingGroup = () => {

    const {
        meetingGroups, setMeetingGroups,
        priority, setPriority,
        scheduledDate, setScheduledDate,
        scheduledStartTime, setStartTime,
        scheduledEndTime, setEndTime,
        scheduledLocation, setScheduledLocation,
        agenda, setAgenda,
        agendaTo, setAgendaTo,
        agendaDes, setAgendaDes,
        priorities,
        addAgenda,
        relatedDepartments, setRelatedDepartments,
        recurring, setRecurring,
        depArr, setDepArr,
        optionsArray, setArray,
        participantsList, setparticipants,
    } = useScheduleContext();

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

    const animatedComponents = makeAnimated();

    return(
        <>
            <Form.Control
                style={{ marginTop: "10px" }}
                name="Name"
                placeholder = "Name Of Meeting Group"
            />
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
    )
}

export default CreateMeetingGroup;