<template>
    <div class="users">
        <div class="users__second">
            <div class="body">
                <div class="users__table">
                    <v-client-table
                            :data="users"
                            :columns="columns"
                            :options="options"
                    >
                        <span slot="__search_xEfLS" slot-scope="{ value, data }"></span>
                        <label class="label" slot="beforeLimit">Type of User</label>
                        <div class="select-group" slot="beforeLimit">
                            <base-dict-select @input="filter"
                                              name="type_of_user"
                                              :options="roleList"
                                              v-model="role"
                            />
                        </div>
                        <BaseButton className="add" text="+ Add"
                                    slot="beforeLimit" @clicked="showAddUser"
                        />
                        <tfoot slot="afterBody">
                        <tr>
                            <td colspan="5">
                                <div class="VuePagination custom">
                                    <nav class="">
                                        <ul class="pagination pull-right VuePagination__pagination">
                                            <li @click="prevPage"
                                                class="VuePagination__pagination-item page-item  VuePagination__pagination-item-prev-page disabled">
                                                <a href="javascript:void(0);" disabled="disabled"
                                                   class="page-link">&lt;</a>
                                            </li>
                                            <li v-for="page in lastPage"
                                                @click="newPage(page)"
                                                v-bind:class="{ active: currentPage===page }"
                                                class="VuePagination__pagination-item page-item">
                                                <a href="javascript:void(0)"
                                                   v-bind:class="{ active: currentPage===page }"
                                                   class="page-link"
                                                   role="button">
                                                    {{page}}
                                                </a>
                                            </li>
                                            <li class="VuePagination__pagination-item page-item VuePagination__pagination-item-next-page ">
                                                <a href="#" @click="nextPage" class="page-link">&gt;</a>
                                            </li>
                                        </ul>
                                        <p class="VuePagination__count pull-left"></p></nav>
                                </div>
                            </td>
                        </tr>
                        </tfoot>
                    </v-client-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import Name from '../table/Name'
    import LastLogin from '../table/LastLogin'
    import JoinStatus from '../table/JoinStatus'
    import TypeOfUser from '../table/TypeOfUser'
    import Buttons from '../table/Buttons'
    import {formatDateUSA} from '../../../../helpers';
    import Add from './Add.vue'
    import EditAdmin from './Edit/EditAdmin';
    import EditUser from './Edit/EditUser';
    import EditInstructor from './Edit/EditInstructor';

    export default {
        data() {
            return {
                query: '',
                roleList: [
                    {id: 0, name: 'All'},
                    {id: 1, name: 'Admin'},
                    {id: 2, name: 'Regular User'},
                    {id: 3, name: 'Instructor'}
                ],
                roleListArr: {
                    0: 'All',
                    1: 'Admin',
                    2: 'Regular User',
                    3: 'Instructor'
                },
                role: {id: 0, name: 'All'},
                columns: ['name', 'joinStatus', 'typeOfUser', 'lastLogin', 'buttons'],
                options: {
                    customFilters: [{
                        name: 'alphabet',
                        callback: function (row, query) {
                            if (query != 0) {
                                return row.role_id == query;
                            }

                            return true;
                        }
                    }],
                    resizableColumns: false,
                    perPageValues: [],
                    sortable: ['name', 'joinStatus', 'typeOfUser', 'lastLogin'],
                    texts: {
                        filter: 'Users',
                        count: ' ',
                        page: 'Page:',
                        first: 'First',
                        last: 'Last',
                        limit: ' ',
                    },
                    sortIcon: {
                        is: 'glyphicon-sort',
                        base: 'glyphicon',
                        up: 'glyphicon-chevron-up',
                        down: 'glyphicon-chevron-down'

                    },
                    headings: {
                        name: 'Name',
                        lastLogin: 'Last Login',
                        joinStatus: 'Join Status',
                        typeOfUser: 'Type of User',
                        buttons: '',
                    },
                    templates: {
                        name: Name,
                        lastLogin: LastLogin,
                        joinStatus: JoinStatus,
                        typeOfUser: TypeOfUser,
                        buttons: Buttons
                    },
                    filterAlgorithm: {
                        name(row, query) {
                            return (row.first_name + ' ' + row.last_name);
                        },
                        lastLogin(row, query) {
                            return (row.last_token ? formatDateUSA(new Date(row.last_token.created_at)) : '');
                        },
                        joinStatus(row, query) {
                            return ('status');
                        },
                        typeOfUser(row, query) {
                            return ('type');
                        }
                    }
                }
            }
        },
        computed: {
            ...mapState({
                users(state) {
                    return state.users.all.items ? state.users.all.items : [];
                },
                lastPage(state) {
                    return state.users.all.lastPage;
                },
                perPage(state) {
                    return state.users.all.perPage;
                },
                currentPage(state) {
                    return state.users.all.currentPage;
                }
            })
        },
        mounted() {
            setTimeout(function () {
                document.querySelector('.VueTables__search__input').placeholder = 'Search';
            }, 10);

            let curObj = this;
            Event.$on('vue-tables.filter', function (data) {
                curObj.query = data;
                curObj.makeGetAllRequest(
                    data,
                    curObj.role.id,
                    curObj.currentPage
                );
            });

            this.getAll({page: 1});
            this.$root.$on('removeuser', function () {
                curObj.makeGetAllRequest(
                    curObj.query,
                    curObj.role.id,
                    curObj.currentPage
                );
            });
            this.$root.$on('openeditmodal', function (data) {
                let view = '';
                let width = 508;
                let options = {
                    userId: data.userId
                };
                switch (data.roleId) {
                    case 1:
                        view = EditAdmin;
                        break;
                    case 2:
                        view = EditUser;
                        break;
                    case 3:
                        view = EditInstructor;
                        width = 900;
                        break;
                }
                this.$modal.show(view, options, {
                    width: width,
                    height: 'auto',
                    classes: 'add-user-modal',
                    scrollable: true,
                    clickToClose: false
                });
            });
        },
        destroyed() {
            Event.$off('vue-tables.filter');
            this.$root.$off('openeditmodal');
            this.$root.$off('removeuser');
        },
        methods: {
            ...mapActions('users', ['getAll']),
            filter(value) {
                this.role.id = value.id;
                this.makeGetAllRequest(
                    this.query,
                    value.id,
                    1
                );
            },
            showAddUser() {
                this.$modal.show(Add, {}, {
                    width: 508,
                    height: 'auto',
                    classes: [
                        'add-user-modal'
                    ],
                    scrollable: true,
                    clickToClose: false
                })
            },
            newPage(page) {
                this.makeGetAllRequest(
                    this.query,
                    this.role.id,
                    page
                );
            },
            prevPage(e) {
                e.preventDefault();
                this.makeGetAllRequest(
                    this.query,
                    this.role.id,
                    (this.currentPage - 1) ? this.currentPage - 1 : 1
                );
            },
            nextPage(e) {
                e.preventDefault();
                this.makeGetAllRequest(
                    this.query,
                    this.role.id,
                    (this.currentPage + 1) <= this.lastPage ? (this.currentPage + 1) : this.lastPage
                );
            },
            makeGetAllRequest(query, role, page) {
                let obj = {query: query};
                if (role != 0) {
                    obj.role = role;
                }
                this.getAll({page: page, params: obj});
            }
        }
    }
</script>
