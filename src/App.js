import { Suspense, lazy, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// store
import { logout } from "./store/slices/auth-slice";

// common
import EventBus from "./common/EventBus";

// home pages
const Home = lazy(() => import("./pages/home/Home"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const Login = lazy(() => import("./pages/other/Login"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const Interior = lazy(() => import("./pages/interior/Interior"));
const Expert = lazy(() => import("./pages/interior/Expert"));
const UserInterior = lazy(() => import("./pages/interior/UserInterior"));
const Completed = lazy(() => import("./pages/interior/Completed"));

const TermsAndConditions = lazy(() =>
  import("./pages/other/TermsAndConditions")
);
const SignUp = lazy(() => import("./pages/other/SignUp"));
const SignUpComplete = lazy(() => import("./pages/other/SignUpComplete"));

const Bubble = lazy(() => import("./pages/bubble/Bubble"));
const BubbleCheckResult = lazy(() =>
  import("./pages/bubble/BubbleCheckResult")
);

const MyPage = lazy(() => import("./pages/mypage/mypage"));

const InteriorEstimate = lazy(() => import("./pages/mypage/InteriorEstimate"));

import ConfirmModal from "./modal/ConfirmModal";
import { setShowAlert } from "./store/slices/message-slice";
import { getMyProfile } from "./store/slices/profile-slice";

import GuardedRoute from "./guards/GuardedRoute";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { errorMessage, showAlert } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getMyProfile());
    }
  }, []);

  return (
    <Router>
      <ConfirmModal
        size="sm"
        show={showAlert}
        showCancel={false}
        confirmLabel={"확인"}
        onHide={() => dispatch(setShowAlert(false))}
        onConfirm={() => {
          dispatch(setShowAlert(false));
        }}
      >
        <span className="mt-3 text-center white-space-pre color-black2">
          {errorMessage}
        </span>
      </ConfirmModal>
      <ScrollToTop>
        <Suspense
          fallback={
            <div className="howterior-preloader-wrapper">
              <div className="howterior-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />

            {/* My pages */}
            <Route
              path={process.env.PUBLIC_URL + "/mypage"}
              element={
                <GuardedRoute isSignedIn={!!currentUser}>
                  <MyPage />
                </GuardedRoute>
              }
            />
            {/* Other pages */}
            <Route
              path={process.env.PUBLIC_URL + "/about"}
              element={<About />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/contact"}
              element={<Contact />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/my-account"}
              element={<MyAccount />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/login-register"}
              element={<LoginRegister />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/login"}
              element={<Login />}
            />

            <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />
            <Route
              path={process.env.PUBLIC_URL + "/wishlist"}
              element={<Wishlist />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/compare"}
              element={<Compare />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={<Checkout />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/interior"}
              element={
                <GuardedRoute isSignedIn={!!currentUser}>
                  <Interior />
                </GuardedRoute>
              }
            />
            <Route
              path={process.env.PUBLIC_URL + "/expert"}
              element={
                <GuardedRoute isSignedIn={!!currentUser}>
                  <Expert />
                </GuardedRoute>
              }
            />
            <Route
              path={process.env.PUBLIC_URL + "/user_interior"}
              element={
                <GuardedRoute isSignedIn={!!currentUser}>
                  <UserInterior />
                </GuardedRoute>
              }
            />
            <Route
              path={process.env.PUBLIC_URL + "/completed"}
              element={<Completed />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/bubble"}
              element={
                <GuardedRoute isSignedIn={!!currentUser}>
                  <Bubble />
                </GuardedRoute>
              }
            />
            <Route
              path={process.env.PUBLIC_URL + "/terms_and_condition"}
              element={<TermsAndConditions />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/signup"}
              element={<SignUp />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/signup_complete"}
              element={<SignUpComplete />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/bubble_check_result"}
              element={<BubbleCheckResult />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/interior_estimate/:seq"}
              element={<InteriorEstimate />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
