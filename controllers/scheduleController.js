const getSchedule = (req, res) => {

    res.status(200).json(req.trainData);
}

const getLineSchedule = (req, res) => {
    const line = req.params.line.toUpperCase();
    trainData = req.trainData;
    departure = req.query.departure;

    //FILTERING TRAIN DATA BY LINE
    trainData = trainData.filter((train) => train.line.toUpperCase() === line);

    //CHECKING IF NO TRAINS FOUND FOR THE LINE
    if (trainData.length === 0) { 
        res.status(404).json({ message: 'Not Found' });
    } 
    else {
        //CHECKING IF NO DEPARTURE QUERY
        if (!departure) {
            res.status(200).json(trainData);
        }
        else {
            //CHECKING IF DEPARTURE QUERY IS VALID
            if (isValidTime(departure)) {
                //FILTERING TRAIN DATA BY DEPARTURE
                trainData = trainData.filter((train) => compareTime(train.departure, departure));
                res.status(200).json(trainData);
            }
            else {
                res.status(400).json({ message: 'Bad Request' });
            }
        }
    }
}

const compareTime = (departureTime, searchedTime) => {
    //CHECKING IF DEPARTURE TIME IS IN 12-HOUR FORMAT
    if(searchedTime.includes(':')) {
        return (departureTime === convert12To24(searchedTime));
    }
    else if (departureTime === Number(searchedTime)) {
        return true;
    }
    else {
        return false;
    }

}

const convert12To24 = (time) => {
    let [hours, minutes] = time.split(':');
    minutes = minutes.replace(/\D/g,'');

    if (time.toLowerCase().includes('am')) {
        hours = (hours === '12') ? '00' : hours;
    }
    else {
        hours = (hours === '12') ? hours : Number(hours) + 12;
    }

    return Number(hours + minutes);
}

const isValidTime = (time) => {
   
    //CHECKING IF TIME IS IN VALID 12-HOUR FORMAT
    if(time.length > 4) {
        const regex = /^(0?[1-9]|1[012])(:[0-5]\d)[APap][mM]$/;
        return regex.test(time);
    }
    //CHECKING IF TIME IS IN VALID 24-HOUR FORMAT
    else {
        const regex = /^(0?[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/;
        return regex.test(time);           
    }
}

module.exports = { getSchedule, getLineSchedule};