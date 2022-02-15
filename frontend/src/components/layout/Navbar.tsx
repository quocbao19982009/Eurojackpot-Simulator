import * as React from "react";

import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store/store";
import { logout } from "../../actions/userAction";
import { stringToColor } from "../../ultis/stringToColor";
import formatMoney from "../../ultis/formatMoney";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo, isLogin } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    setAnchorElUser(null);
    dispatch(logout());
  };

  const profileHandler = () => {
    setAnchorElUser(null);
    navigate("/profile");
  };

  const transitionHandler = () => {
    setAnchorElUser(null);
    navigate("/transaction");
  };

  const gameHistoryHandler = () => {
    setAnchorElUser(null);
    navigate("/history");
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#ffec01", color: "#26282b" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Eurojackpot Simulator
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={{ textDecoration: "none" }} to="/">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "#26282b",
                      display: "block",
                      fontWeight: 600,
                    }}
                  >
                    Lottery Game
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link style={{ textDecoration: "none" }} to="/rule">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "#26282b",
                      display: "block",
                      fontWeight: 600,
                    }}
                  >
                    Game Rule
                  </Button>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "#26282b",
            }}
          >
            Eurojackpot Simulator
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#26282b",
                  display: "block",
                  fontWeight: 600,
                }}
              >
                Lottery Game
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/rule">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#26282b",
                  display: "block",
                  fontWeight: 600,
                }}
              >
                Game Rule
              </Button>
            </Link>
          </Box>
          {!isLogin && (
            <Box sx={{ flexGrow: 0 }}>
              <Link style={{ textDecoration: "none" }} to="/signin">
                <Button sx={{ my: 2, color: "#26282b", display: "block" }}>
                  Sign In
                </Button>
              </Link>
            </Box>
          )}
          {isLogin && userInfo && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile Information">
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Avatar
                    alt={userInfo.name}
                    src={userInfo.avatar ? userInfo.avatar : ""}
                    {...stringAvatar(isLogin && userInfo.name)}
                  />
                  <Typography
                    component={"span"}
                    sx={{
                      color: "#26282b",
                      marginLeft: "0.3rem",
                    }}
                  >
                    {formatMoney(userInfo!.bankAccount)}
                  </Typography>
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={profileHandler}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={transitionHandler}>
                  <Typography textAlign="center">Transaction</Typography>
                </MenuItem>
                <MenuItem onClick={gameHistoryHandler}>
                  <Typography textAlign="center">Game History</Typography>
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
