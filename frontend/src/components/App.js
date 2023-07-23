/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "../index.css";
import Main from "./Main/Main.js";
import Footer from "./Footer/Footer";
import ImagePopup from "./ImagePopup/ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import Page404 from "./Page404/Page404";
import Login from "./Login/Login";
import Register from "./Register/Register";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import * as auth from "../utils/Auth";
import Header from "./Header/Header";
import ShowIconErr from "../images/infoTooltipErr.svg";
import ShowIconSuccess from "../images/infoTooltipSuccess.svg";

function App() {
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        console.log(res)
        setCurrentUser(res);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTooltipUser, setIsTooltipUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showIcon, setShowIcon] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  function handleLogin(email, password) {
     auth
      .authorize(email, password)
      .then((res) => {
        // localStorage.setItem("jwt", data.token);
        setCurrentUser(res);
        setUserProfile(res.emaile, res.avatar, res.name, res.about, res._id);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        if (err) {
          setShowIcon(ShowIconErr)
          setErrorMessage("Что то пошло не так! Попробуйте еще раз.");
        }
        setIsTooltipUser(true);
      });
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        setShowIcon(ShowIconSuccess)
        setErrorMessage("Вы успешно зарегистрировались!");       
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
        setShowIcon(ShowIconErr);
        setErrorMessage(err);
      })
      .finally(() => {setIsTooltipUser(true)})
  }

  const checkToken = () => {
    auth
      .getContent()
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setUserProfile(data.email);
          navigate(location.pathname);
        } else {
          setIsLoggedIn(false);
          navigate("/signin");
        }
      })
      .catch((err) =>{
        setIsLoggedIn(false);
        console.error(err);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  const deleteToken = () => {
    // localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  function handleCardLike(card) {
    const isLiked = card?.likes?.some((i) => (i === currentUser._id));
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c )));
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cardsArray) => cardsArray.filter((c) => card._id !== c._id));
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateUser(dataUser) {
    api
      .editProfileInfo(dataUser)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar(currentAvatar) {
    api
      .updateAvatar(currentAvatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(dataCard) {
    api
      .addNewCard(dataCard)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsTooltipUser(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  return (
    <AppContext.Provider value={ closeAllPopups }>
      <CurrentUserContext.Provider value={currentUser}>
      <div className="main-content">
        <div className="page">
          <Header handleSignOut={deleteToken} userProfile={userProfile} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onEditPlace={handleAddPlaceClick}
                  handleCardClick={(card) => setSelectedCard(card)}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} />
          <InfoTooltip
            isOpen={isTooltipUser}
            message={errorMessage}
            showIcon={showIcon}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
    </AppContext.Provider>
    
  );
}

export default App;
