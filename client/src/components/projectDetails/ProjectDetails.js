import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../constants/apiRoute';
import './ProjectDetails.css';
import Loader from '../shared/loader/Loader';
import Button from '../shared/button/Button';
import { FiPlus } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import DragDrop from './components/DragDrop';
import FavoritesContext from '../../context/favoritesContext';
import dp1 from '../../images/dp/dp1.PNG';
// import dp2 from '../../images/dp/dp2.PNG';
// import dp3 from '../../images/dp/dp3.PNG';
// import dp4 from '../../images/dp/dp4.PNG';
import SubHeader from '../shared/subHeader/SubHeader';

function ProjectDetails(props) {
    const api_url = config.url.API_URL;
    const { favorites, setFavorites } = useContext(FavoritesContext);
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshTasks, setRefreshTasks] = useState(0);

    let id = props.match.params.id;
    useEffect(() => {
        const getprojectData = async () => {
            const projectData = await axios.get(api_url + 'project/' + id);
            setProject(projectData.data);
            getTaskData(projectData.data._id);
        }
        const getTaskData = async (id) => {
            const taskData = await axios.get(api_url + 'task/project/' + id);
            setTasks(taskData.data.splitedTasks);
            setLoading(false);
        }
        getprojectData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, refreshTasks]);

    const addMember = () => {
        console.log('Add Member');
    };
    const addTask = () => {
        console.log('Add Task');
    };
    const removeFromFavorites = (id) => {
        axios.patch(api_url + 'project/remove-favorites/' + id).then(response => {
            let fav = [...favorites];
            var index = fav.findIndex(x => x._id === id)
            if (index !== -1) {
                fav.splice(index, 1);
                setFavorites(fav);
            }
        });
    };

    const addToFavorites = (id, name) => {
        axios.patch(api_url + 'project/add-favorites/' + id).then(response => {
            setFavorites([...favorites, { _id: id, name: name }]);
        });
    };
    const checkFavorite = (id) => {
        let fav = favorites?.filter(favorite => {
            return favorite._id === id;
        });
        return (fav?.length) ? true : false;
    };
    const handleTaskChange = () => {
        setRefreshTasks(prev => prev + 1);
    };
    return (
        <div className="projectDetails">
            <SubHeader
                heading="Projects"
                subHeading={project.name}
                navLink='/projects'>
                <div className="projectDetails__rightSection">
                    <div className="projectDetails__members">
                        {project.members?.map((member,index) => (
                            <div title={member.displayName} key={member._id} className="projectDetails__memberCard center">
                                <img className="projectDetails__memberIcon" src={"http://localhost:5000/uploads/" + member.displayPicture} alt="" />
                            </div>
                        ))}
                        <div className="projectDetails__memberCard--dashed center" onClick={addMember}>
                            <FiPlus className="projectDetails__memberIcon--new" />
                        </div>
                    </div>
                    <Button text={"Add Task"} icon={<FiPlus />} clicked={addTask} />
                </div>
                {checkFavorite(project._id) ? <AiFillStar className="projectDetails__fillStar star" onClick={() => removeFromFavorites(project._id)} />
                    : <AiOutlineStar className="projectDetails__outlineStar star" onClick={() => addToFavorites(project._id, project.name)} />}
            </SubHeader>

            {!loading ?
                (<div className="projectDetails__main">
                    <DragDrop tasks={tasks} setTasks={setTasks} refresh={handleTaskChange} />
                </div>) : (<Loader />)
            }
        </div >
    )
}

export default withRouter(ProjectDetails);
