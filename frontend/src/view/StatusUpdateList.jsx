import React from "react";
import axios from "axios";
import StatusUpdate from "./StatusUpdate";

export default function StatusUpdateList(props) {
    const { users } = props;
    const [ statusUpdateList, setStatusUpdateList ] = useState([]);

    useEffect(async () => {
        const usernameToUser = {}
        users.forEach(user => {
            usernameToUser[user.username] = user;
        })
        axios.get(`/api/statusUpdates${users.length === 1 ? `/users/${users[0].username}` : ''}`)
            .then(data => {
                setStatusUpdateList([...data.data
                    .sort((update1, update2) => update2.timestamp - update1.timestamp)
                    .map(statusUpdate => {
                        const user = usernameToUser[statusUpdate.username];
                        return (<StatusUpdate
                            statusUpdateId={statusUpdate._id}
                            username={user.username}
                            userImage={user.userImage}
                            timestamp={statusUpdate.timestamp}
                            text={statusUpdate.text}
                            imageUrl={statusUpdate.imageUrl}
                        />);
                    })]);
            })
            .catch(err => {
                console.error(err);
            })
    }, [users]);


    return (<div>{statusUpdateList}</div>);
}