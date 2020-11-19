import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import { config } from '../../constants/apiRoute';
import './ProjectDetails.css';
import Loader from '../shared/loader/Loader';
import Button from '../shared/button/Button';
import { FiPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import DragDrop from './components/DragDrop';
import FavoritesContext from '../../context/favoritesContext';


function ProjectDetails(props) {
    const api_url = config.url.API_URL;
    const { favorites, setFavorites } = useContext(FavoritesContext);
    const [project, setProject] = useState({});
    const [tasks, setTasks] = useState({});
    const [loading, setLoading] = useState(true);

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
    }, [id]);

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
    return (
        <div className="projectDetails">
            <div className="projectDetails__header">
                <div className="projectDetails__heading">
                    <NavLink to="/projects" className="projectDetails__mainHeading">
                        <h1>Projects</h1>
                    </NavLink>
                    <span className="projectDetails__symbol">{'>'}</span>
                    <h1 className="projectDetails__subHeading">{project.name}</h1>
                    {checkFavorite(project._id) ? <AiFillStar className="projectDetails__fillStar star" onClick={() => removeFromFavorites(project._id)} />
                        : <AiOutlineStar className="projectDetails__outlineStar star" onClick={() => addToFavorites(project._id, project.name)} />}
                </div>
                <div className="projectDetails__rightSection">
                    <div className="projectDetails__members">
                        <div className="projectDetails__memberCard center">
                            <AiOutlineUser className="projectDetails__memberIcon" />
                        </div>
                        <div className="projectDetails__memberCard center">
                            <AiOutlineUser className="projectDetails__memberIcon" />
                        </div>
                        <div className="projectDetails__memberCard center">
                            <AiOutlineUser className="projectDetails__memberIcon" />
                        </div>
                        <div className="projectDetails__memberCard--dashed center">
                            <FiPlus className="projectDetails__memberIcon" />
                        </div>
                    </div>
                    <Button text={"Add Task"} icon={<FiPlus />} clicked={addTask} />
                </div>

            </div>
            {!loading ?
                (<div className="projectDetails__main">
                    <DragDrop tasks={tasks} setTasks={setTasks} />
                </div>) : (<Loader />)
            }
        </div >
    )
}

export default withRouter(ProjectDetails);
