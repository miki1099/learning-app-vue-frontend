<template>

<header>
    <img src="~@\assets\menu.svg" id="side-menu"/>
    <div id="user-side">
        <div id="welcome-user">Witaj Login</div>
        <button>Wyloguj</button>
    </div>
</header>
</template>

<script>

export default{
    
}
</script>


<style scoped>
header {
    width: 90%;
    margin: 0 5%;
}

#side-menu {
    float: left;
    width: 4%;
    height: 4%;
}

#user-side {
    display: flex;
    justify-content: flex-end;
}

#welcome-user {
    font-size: 2vw;
    top: 5%;
    text-align: center;
    display: inline-block;
    margin: 0 5%;
}
 button {
    display: inline-block;
    background: rgba(0, 11, 71, 0.3);
    border-radius: 30px;
    color: #E9E9E9;
    min-width: 70px;
    max-width: 200px;
    width: 10%;
    min-height: 30px;
    /* max-height: 90px; */
    height: 5%;
    font-size: 1.2vw;
 }
</style>