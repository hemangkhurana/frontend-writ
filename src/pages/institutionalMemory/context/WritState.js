import React, {useState} from 'react';

export const useWritState = () => {
    const [writNumber, setWritNumber] = useState('');
    const [writDate, setWritDate] = useState('');
    const [writPetitionerName, setWritPetitionerName] = useState('');
    const [writRespondentNames, setWritRespondentNames] = useState([]);
    const [writPetitionerPrayer, setWritPetitionerPrayer] = useState('');
    const [writCourtOrder, setWritCourtOrder] = useState('');
    const [writDcComments, setWritDcComments] = useState('');
    const [writPriority, setWritPriority] = useState('');
    const [writFileAttachment, setWritFileAttachment] = useState('');
    const [writDepartment, setWritDepartment] = useState('');

    const [remarkDate, setRemarkDate] = useState('');
    const [paraRemark, setParaRemark] = useState('');
    const [remarkDcComments, setRemarkDcComments] = useState('');
    const [remarkFileAttachment, setRemarkFileAttachment] = useState('');

    const [contemptDate, setContemptDate] = useState('');
    const [contemptText, setContemptText] = useState('');
    const [contemptDcComments, setContemptDcComments] = useState('');
    const [contemptFileAttachment, setContemptFileAttachment] = useState('');

    const [counterFormInstances, setCounterFormInstances] = useState([]);
    const [counterFileAttachment, setCounterFileAttachment] = useState('');

    const [courtOrderFileAttachment, setCourtOrderFileAttachment] = useState('');


    const [filteredData, setFilteredData] = useState([]);
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [filterCloseChecked, setFilterCloseChecked] = useState(false);
    const [filterWritRespondentNames, setFilterWritRespondentNames] = useState("");
    const [filterWritPriority, setFilterWritPriority] = useState("");
    const [filterStatus, setFilterStatus] = useState(0);
    const [filterWritDepartment, setFilterWritDepartment] = useState("");
    const [filterProject, setFilterProject] = useState("");
    const [filterLandDepartment, setFilterLandDepartment] = useState(false);
    const [filterSurveyNumber, setFilterSurveyNumber] = useState("");
    const [filterRevenueVillage, setFilterRevenueVillage] = useState("");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [searchApplied, setSearchApplied] = useState(false);
    const [searchText, setSearchText] = useState("");

    const [writClose, setWritClose] = useState(false);
    const [writCloseDate, setWritCloseDate] = useState("");

    const [loading, setLoading] = useState(false);

    const [isAddNew, setIsAddNew] = useState(false);

    const handleDownloadFileAttachment = (fileAttachment, fileName) => {
        console.log(1);
        try {
            // Check if fileAttachment is available
            console.log(fileAttachment);
            if (fileAttachment) {
                // Create a temporary link element
                const link = document.createElement("a");
                link.href = URL.createObjectURL(fileAttachment);
                link.download = fileName; // Set the desired file name

                // Trigger the download
                document.body.appendChild(link);
                link.click();

                // Clean up
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Error during file download:", error);
        }
    };

    const handleDownloadWritFileAttachment = () => {
        handleDownloadFileAttachment(writFileAttachment, "writFileAttachment");
    };

    const handleDownloadRemarkFileAttachment = () => {
        handleDownloadFileAttachment(remarkFileAttachment, "remarkFileAttachment");
    };

    const handleDownloadContemptFileAttachment = () => {
        handleDownloadFileAttachment(contemptFileAttachment, "contemptFileAttachment");
    };

    return {
        writNumber,
        setWritNumber,

        writDate,
        setWritDate,
        writPetitionerName,
        setWritPetitionerName,
        writRespondentNames,
        setWritRespondentNames,
        writPetitionerPrayer,
        setWritPetitionerPrayer,
        writCourtOrder,
        setWritCourtOrder,
        writDcComments,
        setWritDcComments,
        writPriority,
        setWritPriority,
        writFileAttachment,
        setWritFileAttachment,
        writDepartment,
        setWritDepartment,

        remarkDate,
        setRemarkDate,
        paraRemark,
        setParaRemark,
        remarkDcComments,
        setRemarkDcComments,
        remarkFileAttachment,
        setRemarkFileAttachment,

        contemptDate,
        setContemptDate,
        contemptText,
        setContemptText,
        contemptDcComments,
        setContemptDcComments,
        contemptFileAttachment,
        setContemptFileAttachment,

        counterFormInstances,
        setCounterFormInstances,

        filteredData,
        setFilteredData,
        filtersApplied,
        setFiltersApplied,
        filterCloseChecked, setFilterCloseChecked,
        filterWritRespondentNames, setFilterWritRespondentNames,
        filterWritPriority, setFilterWritPriority,
        filterStatus, setFilterStatus,
        filterWritDepartment, setFilterWritDepartment,
        filterProject, setFilterProject,
        filterLandDepartment, setFilterLandDepartment,
        filterSurveyNumber, setFilterSurveyNumber,
        filterRevenueVillage, setFilterRevenueVillage,
        filterStartDate, setFilterStartDate,
        filterEndDate, setFilterEndDate,
        searchApplied, setSearchApplied,
        searchText, setSearchText,

        writClose, setWritClose,
        writCloseDate, setWritCloseDate,

        counterFileAttachment, setCounterFileAttachment,
        courtOrderFileAttachment, setCourtOrderFileAttachment,
        isAddNew, setIsAddNew,
        loading, setLoading,

        handleDownloadWritFileAttachment,
        handleDownloadRemarkFileAttachment,
        handleDownloadContemptFileAttachment,
    };
};