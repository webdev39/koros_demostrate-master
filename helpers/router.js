import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from '../store';
import { auth, admin, user, instructor, sharedAdminInstr, middlewarePipeline } from './router-middleware';
import TipFormView from "../components/main/tips/TipFormView";

Vue.use(VueRouter);

const Auth = () => import(/* webpackChunkName: 'auth' */ '../components/Auth.vue');
const Main = () => import(/* webpackChunkName: 'mainPage' */ '../components/Main.vue');
const MainAdmin = () => import(/* webpackChunkName: 'mainPage' */ '../components/MainAdmin.vue');
const Agreement = () => import(/* webpackChunkName: 'agreement' */ '../components/Agreement.vue');
const PageNotFound = () => import('../components/PageNotFound.vue');
const Forbidden = () => import('../components/Forbidden.vue');

const Login = () => import(/* webpackChunkName: 'auth' */ '../components/auth/Login.vue');
const SignUp = () => import(/* webpackChunkName: 'sign-up' */ '../components/auth/SignUp.vue');
const Registration = () => import(/* webpackChunkName: 'auth' */ '../components/auth/Registration.vue');
const ForgotPassword = () => import(/* webpackChunkName: 'auth' */ '../components/auth/ForgotPassword.vue');
const ResetPassword = () => import(/* webpackChunkName: 'auth' */ '../components/auth/ResetPassword.vue');

const Profile = () => import(/* webpackChunkName: 'profile' */ '../components/main-admin/profile/Profile.vue');
const EditProfile = () => import(/* webpackChunkName: 'profile' */ '../components/main-admin/profile/Edit.vue');
const ProfileIndex = () => import(/* webpackChunkName: 'profile' */ '../components/main-admin/profile/Index.vue');

const User = () => import(/* webpackChunkName: "user-profile" */ '../components/main/user-components/User.vue');
const UserProfile = () => import(/* webpackChunkName: "user-profile" */ '../components/main/user-components/profile/Profile.vue'); 
const Contact = () => import(/* webpackChunkName: "user-profile" */ '../components/main/user-components/Contact.vue');
const Feedback = () => import(/* webpackChunkName: "user-profile" */ '../components/main/user-components/feedback/Feedback.vue');

const Instructor = () => import(/* webpackChunkName: "user-profile" */ '../components/main/instructor-components/Instructor.vue');
const InstructorProfile = () => import(/* webpackChunkName: "user-profile" */ '../components/main/instructor-components/profile/profile-view/ProfileView.vue');
const InstructorProfileEdit = () => import(/* webpackChunkName: "user-profile" */ '../components/main/instructor-components/profile/profile-edit/ProfileEdit.vue');

const Invite = () => import(/* webpackChunkName: 'invite' */ '../components/main-admin/users/invite/Invite.vue');
const InviteIndex = () => import(/* webpackChunkName: 'invite' */ '../components/main-admin/users/invite/Index.vue');

const Users = () => import(/* webpackChunkName: 'users' */ '../components/main-admin/users/Users.vue');
const Dashboard = () => import(/* webpackChunkName: 'dashboard' */ '../components/main-admin/Dashboard.vue');

const TermsOfUse = () => import(/* webpackChunkName: 'agreement' */ '../components/agreement/TermsOfUse.vue');
const PrivacyPolicy = () => import(/* webpackChunkName: 'agreement' */ '../components/agreement/PrivacyPolicy.vue');

const ClassesIndex = () => import(/* webpackChunkName: 'recorded-classes' */ '../components/main-admin/recorded-classes/Index.vue');
const ClassesCategories = () => import(/* webpackChunkName: 'recorded-classes' */ '../components/main-admin/recorded-classes/Categories.vue');
const CategoryClasses = () => import(/* webpackChunkName: 'recorded-classes' */ '../components/main-admin/recorded-classes/RecordedClasses.vue');
const Class = () => import(/* webpackChunkName: 'recorded-classes' */ '../components/main-admin/recorded-classes/RecordClass.vue');
const EditClass = () => import(/* webpackChunkName: 'recorded-classes' */ '../components/main-admin/recorded-classes/EditRecordClass.vue');
const ClassesPage = () => import(/* webpackChunkName: 'recorded-classes' */ '../components/main/recorded-classes/ClassesPage.vue');
const CategoryView = () => import(/* webpackChunkName: 'recorded-classes' */ '../components/main/recorded-classes/CategoryView');
const ClassView = () => import(/* webpackChunkName: 'recorded-classes' */ '../components/main/recorded-classes/ClassView');

const LiveClassCourses = () => import(/* webpackChunkName: 'live-classes' */ '../components/main/live-classes/courses-listing/CoursesListing.vue');
const LiveClassCourse = () => import(/* webpackChunkName: 'live-classes' */ '../components/main/live-classes/course/Course.vue');
const CreateLiveClassCourse = () => import(/* webpackChunkName: 'live-classes' */ '../components/main-admin/live-classes/course/Create.vue');
const EditLiveClassCourse = () => import(/* webpackChunkName: 'live-classes' */ '../components/main-admin/live-classes/course/Edit.vue');
const CreateLiveClass = () => import(/* webpackChunkName: 'live-classes' */ '../components/main-admin/live-classes/live-class/Create.vue');
const EditLiveClass = () => import(/* webpackChunkName: 'live-classes' */ '../components/main-admin/live-classes/live-class/Edit.vue');
const LiveStreaming = () => import(/* webpackChunkName: 'live-classes' */ '../components/main-admin/live-classes/live-class/LiveStreaming.vue');

const TipsView = () => import(/* webpackChunkName: 'tips' */ '../components/main/tips/TipsView');

const routes = [
    {
        path: '/auth',
        component: Auth,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'sign-up',
                name: 'sign-up',
                component: SignUp
            },
            {
                path: 'register',
                name: 'register',
                component: Registration
            },
            {
                path: 'forgot-password',
                name: 'forgotPassword',
                component: ForgotPassword
            },
            {
                path: 'reset-password',
                name: 'resetPassword',
                component: ResetPassword
            }
        ]
    },
    {
        path: '/',
        component: Main,
        name: 'main',
        meta: {
          middleware: [
            auth
          ]
        },
        children: [
            {
                path: '/user',
                name: 'user',
                component: User,
                meta: {
                    middleware: [
                        auth,
                        user
                    ]
                },
                children: [
                    {
                        path: 'profile',
                        name: 'userProfile',
                        component: UserProfile,
                        meta: {
                            middleware: [
                                auth,
                                user
                            ]
                        }
                    },
                    {
                        path: 'contact',
                        name: 'contact',
                        component: Contact,
                        meta: {
                            middleware: [
                                auth,
                                user
                            ]
                        }
                    },
                    {
                        path: 'feedback',
                        name: 'feedback',
                        component: Feedback,
                        meta: {
                            middleware: [
                                auth,
                                user
                            ]
                        }
                    }
                ]
            },
            {
                path: '/instructor',
                name: 'instructor',
                component: Instructor,
                children: [
                    {
                        path: 'profile',
                        name: 'instructorProfile',
                        component: InstructorProfile,
                        meta: {
                          middleware: [
                              auth,
                              instructor
                          ]
                        }
                      },
                      {
                          path: 'profile-edit',
                          name: 'instructorProfileEdit',
                          component: InstructorProfileEdit,
                          meta: {
                            middleware: [
                                auth,
                                instructor
                            ]
                          }
                    }
                ]
            },
            {
                path: 'live-class-courses',
                name: 'liveClassCourses',
                component: LiveClassCourses,
                meta: {
                  middleware: [
                    auth
                  ]
                },
            },
            {
              path: 'live-class-course/:courseId',
              name: 'liveClassCourse',
              component: LiveClassCourse,
              meta: {
                middleware: [
                    auth
                ]
              }
            },
            {
              path: 'all-classes',
              name: 'allClasses',
              component: ClassesPage,
              meta: {
                middleware: [
                  auth
                ]
              }
            },
            { path: 'tips', name: 'tips', component: TipsView, meta: { middleware: [auth] } },

            { path: 'categories/:categoryId', name: 'category', component: CategoryView, meta: { middleware: [auth] } },
            { path: 'classes/:classId', name: 'class', component: ClassView, meta: { middleware: [auth] } },
        ]
    },
    
    {
        path: '/admin',
        component: MainAdmin,
        name: 'home',
        meta: {
          middleware: [
            auth
          ]
        }, 
        children: [
            {
                path: 'profile',
                component: Profile,
                children: [
                    {
                        path: '',
                        name: 'profile',
                        component: ProfileIndex,
                        meta: {
                            middleware: [
                                auth,
                                admin
                            ]
                        }
                    },
                    {
                        path: 'edit',
                        name: 'editProfile',
                        component: EditProfile,
                        meta: {
                            middleware: [
                                auth,
                                admin
                            ]
                        }
                    }
                ]
            },
            {
                path: 'users',
                name: 'users',
                component: Users,
                meta: {
                    middleware: [
                        auth,
                        admin
                    ]
                },
                children: [
                    {
                        path: 'invite',
                        component: Invite,
                        children: [
                            {
                                path: '',
                                name: 'invite',
                                component: InviteIndex,
                                meta: {
                                    middleware: [
                                        auth,
                                        admin
                                    ]
                                },
                            }
                        ]
                    }
                ]
            },
            {
                path: 'classes',
                name: 'classes',
                props: true,
                component: ClassesIndex,
                meta: {
                    middleware: [
                        auth
                    ]
                },
                children: [
                    {
                        path: 'categories',
                        name: 'classesCategories',
                        component: ClassesCategories,
                        meta: {
                            middleware: [
                                auth,
                                admin
                            ]
                        },
                    },
                    {
                        path: 'categories/:categoryName',
                        name: 'categoryClasses',
                        props: true,
                        component: CategoryClasses,
                        meta: {
                            middleware: [
                                auth,
                                admin
                            ]
                        },
                    },
                    {
                        path: 'class/:classId',
                        name: 'singleClass',
                        props: true,
                        component: Class,
                        meta: {
                            middleware: [
                                auth,
                                admin
                            ]
                        },
                    },
                    {
                        path: 'class/:classId/edit',
                        name: 'editClass',
                        props: true,
                        component: EditClass,
                        meta: {
                            middleware: [
                                auth,
                                admin
                            ]
                        },
                    },
                ]
            },
            {
                path: 'live-class-courses',
                name: 'adminLiveClassCourses',
                component: LiveClassCourses,
                meta: {
                  middleware: [
                    auth,
                    admin
                  ]
                },
            },
            {
              path: 'live-class-course/:courseId',
              name: 'adminLiveClassCourse',
              component: LiveClassCourse,
              meta: {
                middleware: [
                    auth,
                    admin
                ]
              }
            },
            {
              path: 'create-live-class-course',
              name: 'createLiveClassCourse',
              component: CreateLiveClassCourse,
              meta: {
                  middleware: [
                      auth,
                      sharedAdminInstr
                  ]
              }
            },
            {
              path: 'edit-live-class-course/:courseId',
              name: 'editLiveClassCourse',
              component: EditLiveClassCourse,
              meta: {
                  middleware: [
                      auth,
                      sharedAdminInstr
                  ]
              }
            },
            {
              path: 'live-class-course/:courseId/create-live-class',
              name: 'createLiveClass',
              component: CreateLiveClass,
              meta: {
                  middleware: [
                      auth,
                      sharedAdminInstr
                  ]
              }
            },
            {
              path: 'live-class-course/:courseId/live-class/:liveClassId/edit',
              name: 'editLiveClass',
              component: EditLiveClass,
              meta: {
                  middleware: [
                      auth,
                      sharedAdminInstr
                  ]
              }
            },
            {
              path: 'live-class-course/:courseId/live-class/:liveClassId/live-streaming',
              name: 'liveStreaming',
              component: LiveStreaming,
              props: true,
              meta: {
                  middleware: [
                      auth,
                      sharedAdminInstr
                  ]
              }
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
                meta: {
                    middleware: [
                        auth,
                        admin
                    ]
                }
            },
            { path: 'tips', name: 'adminTips', component: TipsView, meta: { middleware: [auth, admin] }, children: [
                {
                    path: 'form/:id',
                    name: 'adminTipForm',
                    //props: true,
                    //component: TipFormView,
                    component: TipsView,
                    meta: {middleware: [auth, admin]},
                },
            ]},
        ]
    },
    {
        path: '/agreement', 
        component: Agreement,
        children: [
            {
                path: 'terms-of-use',
                name: 'termsOfUse',
                component: TermsOfUse
            },
            {
                path: 'privacy-policy',
                name: 'privacyPolicy',
                component: PrivacyPolicy
            }
        ]
    },
    {
        path: '/404',
        component: PageNotFound,
        name:'pageNotFound'
    },
    {
        path: '/403',
        component: Forbidden,
        name:'forbidden'
    }
];

export const router = new VueRouter({
    mode: 'history',
    routes: routes
});

router.beforeEach(async (to, from, next) => {
    let viewPortTag = document.querySelector('meta[name=viewport]');

    if (
        ( !store.state.account.user || store.state.account.user.role_id !== 1
        ) && !viewPortTag
        ) {
        viewPortTag = document.createElement('meta');
        viewPortTag.id = 'viewport';
        viewPortTag.name = 'viewport';
        viewPortTag.content = 'width=device-width, initial-scale=1.0';
        document.getElementsByTagName('head')[0].appendChild(viewPortTag);
    }
    else if (store.state.account.user && store.state.account.user.role_id === 1 && viewPortTag) {
        viewPortTag.parentNode.removeChild(viewPortTag);
    }
    
    if (!to.meta.middleware) {
        return next()
    }

    const middleware = to.meta.middleware;
    const context = {
        to,
        from,
        next,
        store
    };

    return middleware[0]({
        ...context,
        nextMiddleware: middlewarePipeline(context, middleware, 1)
    })
});