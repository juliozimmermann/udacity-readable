import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// eslint-disable-next-line
import appStyle from '../App.css';

import { Button, Table, Modal } from 'react-bootstrap';
import { TiEdit, TiDelete, TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/lib/ti';

import { dataSort } from '../actions'
import { loadAllData, deletePost, postVoteDown, postVoteUp } from '../actions/integrations';

import Category from '../components/Category';
import Vote from '../components/Vote';
import AddEditPostDialog from '../components/AddEditPostDialog';

export class Home extends Component { 

    state = {
        showAddModalPost: false,
        showDeleteModalPost: false,
        postEdit: null
    }

    componentDidMount() {
        this.props.loadAllData();
    }

    handleTrClick(evt, category, postId) {
        if (evt.target.tagName === 'TD') {
            this.handleDetails(category, postId);
        }
    }

    handleDetails(category, postId, evt) {
        this.props.history.push(`/${category}/${postId}`);
    }

    handleSort(field) {
        this.props.sort(field, this.props.dataSort.field === field ? this.props.dataSort.order : 0);
    }

    handlePostDelete(post) {
        this.props.deletePost(this.state.postEdit.id);

        this.setState({ postEdit: null, showDeleteModalPost: false});
    }

    render() {
        return (
            <div className="page-container">
                <h1>{(this.props.match.params.category && `${this.props.match.params.category}'s Posts`) || 'Home'}</h1>
                
                {
                    this.props.match.params.category !== undefined &&
                    <Button bsStyle="primary" onClick={() => this.props.history.push('/')}>All categories</Button>
                }
                
                <Table responsive hover condensed className="table-row-click">
                    <thead>
                        <tr>
                            <th><span>#</span></th>
                            <th><span>Title</span></th>
                            <th><span>Author</span></th>
                            <th><span>Comments</span></th>
                            <th>
                                <span>Date</span>
                                <Button 
                                    className="padding-less" 
                                    bsStyle="link" 
                                    onClick={() => this.handleSort('timestamp')}>
                                    {
                                        (this.props.dataSort.field !== "timestamp" ||
                                         (this.props.dataSort.field === "timestamp" && 
                                          this.props.dataSort.order !== 1)) &&
                                        <TiArrowSortedDown size={24} /> 
                                    }
                                    {   
                                        (this.props.dataSort.field !== "timestamp" ||
                                        (this.props.dataSort.field === "timestamp" &&
                                        this.props.dataSort.order !== 2)) &&
                                        <TiArrowSortedUp size={24} /> 
                                    }
                                </Button>
                            </th>
                            <th>
                                <span>Score</span>
                                <Button 
                                    className="padding-less" 
                                    bsStyle="link" 
                                    onClick={() => this.handleSort('voteScore')}>
                                    {   
                                        (this.props.dataSort.field !== "voteScore" ||
                                        (this.props.dataSort.field === "voteScore" &&
                                        this.props.dataSort.order !== 1)) &&
                                        <TiArrowSortedDown size={24} /> 
                                    }
                                    {   
                                        (this.props.dataSort.field !== "voteScore" ||
                                         (this.props.dataSort.field === "voteScore" &&
                                          this.props.dataSort.order !== 2)) &&
                                        <TiArrowSortedUp size={24} /> 
                                    }
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.posts.map((post, index) =>
                                (
                                    (this.props.match.params.category || 
                                     post.category) === post.category
                                    &&
                                    <tr key={`tr-${post.id}`} onClick={(evt) => this.handleTrClick(evt, post.category, post.id)}>
                                        <td>
                                            <Link to={`/${post.category}`}>
                                                <Category category={post.category} />
                                            </Link>
                                            <Button 
                                                className="padding-less" 
                                                bsStyle="link"
                                                onClick={() => this.setState({postEdit: post, showAddModalPost: true})}>
                                                    <TiEdit size={24} />
                                            </Button>
                                            <Button 
                                                className="padding-less" 
                                                bsStyle="link"
                                                onClick={() => this.setState({postEdit: post, showDeleteModalPost: true}) }>
                                                    <TiDelete size={24} />
                                            </Button>
                                        </td>
                                        <td><span>{post.title}</span></td>
                                        <td><span>{post.author}</span></td>
                                        <td><span>{post.comments && post.comments.length}</span></td>
                                        <td><span>{new Date(post.timestamp).toDateString()}</span></td>
                                        <td><Vote interaction={post} showLabel={false} voted={this.props.postVote}/></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </Table>
                <Button bsStyle="primary" onClick={() => this.setState({showAddModalPost: true})}>New Post</Button>
                <AddEditPostDialog post={this.state.postEdit} 
                    showModal={this.state.showAddModalPost} 
                    hideModal={() => this.setState({showAddModalPost: false, postEdit: null})} 
                    categories={this.props.categories} />

                <Modal show={this.state.showDeleteModalPost} onHide={() => this.setState({showDeleteModalPost: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Are you sure that you want to delete this post?</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={() => this.handlePostDelete()}>Delete</Button>
                        <Button onClick={() => this.setState({showDeleteModalPost: false})}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps({posts, categories, comments, dataSort}) {
    //var dataSortParsed = Object.keys(dataSort['home']).map((field) => ({ field: field, order: dataSort['home'][field] }));
    let orderBy = dataSort["home"];

    return {
        posts: Object.keys(posts)
                .filter(postId => posts[postId].deleted === false)
                .map(postId => {
                    posts[postId].comments = Object.keys(comments)
                        .map(commentId => comments[commentId])
                        .filter(comment => comment.deleted === false && comment.parentId === postId);
                    return posts[postId];
                }).sort((a, b) => {
                    if (orderBy !== undefined &&
                        orderBy.order > 0) {
                        return (a[orderBy.field] - b[orderBy.field]) * (orderBy.order === 2 ? -1 : 1);
                    } else {
                        return 0;
                    }
                }),
        dataSort: {
            ...dataSort["home"]
        },
        categories: Object.keys(categories).map(category => categories[category])
    }
}

function mapDispatchToProps(dispatch, state) {
    return {
        loadAllData: () => dispatch(loadAllData()),
        sort: (field, order = -1) => dispatch(dataSort("home", field, ++order > 2 ? 0 : order)),
        postVote: (post, up) => up ? dispatch(postVoteUp(post)) : dispatch(postVoteDown(post)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
