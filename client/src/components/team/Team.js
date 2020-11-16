import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import axios from 'axios';
import { config } from '../../constants/apiRoute';
import { FiAperture } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import './Team.css';
import Loader from '../shared/loader/Loader';
import Button from '../shared/button/Button';
import ProgressBar from '../shared/progressBar/ProgressBar';

function Team(props) {
    const api_url = config.url.API_URL;
    const [team, setTeam] = useState({});
    const [loading, setLoading] = useState(true);
    let id = props.match.params.id;
    useEffect(() => {
        const getTeamData = async () => {
            try {
                const teamData = await axios.get(api_url + 'team/' + id);
                setTeam(teamData.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getTeamData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const addProject = () => {
        console.log('Add Project');
    };
    return (
        <div className="team">
            <div className="team__header">
                <div className="team__heading">
                    <h1>{team.name}</h1>
                </div>
                <Button text={"Add Project"} icon={<FiPlus />} clicked={addProject} />
            </div>
            {!loading ?
                (<div className="team__main">
                    <div className="team__projects">
                        <h2>Projects</h2>
                        <div className="team__content">
                            {team.projects?.map(project => (
                                <NavLink to={`/project/${project.id}`} key={project.id} className="team__project">
                                    <div className="team__projectHeader">
                                        <div className="team__projectCard center">
                                            <FiAperture className="team__projectIcon" />
                                        </div>
                                        <p className="project__dueTime">
                                            <FiClock />
                                            <span>12 days left</span>
                                        </p>
                                    </div>
                                    <div className="team__projectDetails">
                                        <p className="team__projectName">{project.name}</p>
                                        <p className="team__projectDesc">A tool for tracking your personal work and managing profits</p>
                                        <p className="team__projectTask">Task done :&nbsp;&nbsp;<span>16</span> / 25</p>
                                        <ProgressBar />
                                    </div>
                                    <div className="team__projectFooter">
                                        <div className="team__projectFooterCard center">
                                            <AiOutlineUser className="team__projectFooterUserIcon" />
                                        </div>
                                        <div className="team__projectFooterCard center">
                                            <AiOutlineUser className="team__projectFooterUserIcon" />
                                        </div>
                                        <div className="team__projectFooterCard center">
                                            <AiOutlineUser className="team__projectFooterUserIcon" />
                                        </div>
                                        <div className="team__projectFooterCard--dashed center">
                                            <FiPlus className="team__projectFooterUserIcon" />
                                        </div>
                                    </div>
                                </NavLink>
                            ))
                            }
                        </div>
                    </div>
                    <div className="teams">
                        <div className="team__head">
                            <h2>Team Head</h2>
                            <div className="team__content">
                                <div className="team__member">
                                    <div className="team__memberCard center">
                                        <AiOutlineUser className="team__memberIcon" />
                                    </div>
                                    <div className="team__memberDetails">
                                        <div className="team__memberName">{team.head?.name}</div>
                                        <div className="team__memberEmail">{team.head?.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="team__members">
                            <h2>Members</h2>
                            <div className="team__content">
                                {team.members?.map(member => (
                                    <div key={member.id} className="team__member">
                                        <div className="team__memberCard center">
                                            <AiOutlineUser className="team__memberIcon" />
                                        </div>
                                        <div className="team__memberDetails">
                                            <div className="team__memberName">{member.name}</div>
                                            <div className="team__memberEmail">{member.email}</div>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>) : (<Loader />)
            }
        </div>
    )
}

export default withRouter(Team);
