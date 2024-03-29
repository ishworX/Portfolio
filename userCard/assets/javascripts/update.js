fetch("config.json").then(function (response) {
    return response.json();
}).then(function (data) {
    var rolelist = ""; 
    var badgelist = "";
    for (var i = 0; i < data.roles.length; i++) {
        rolelist += '<div class="role"><div class="role-color" style="background:' + data.roles[i].color + '"></div><p>' + data.roles[i].rolename + '</p></div>';
    };
    for (var i = 0; i < data.badges.length; i++) {
        badgelist += '<div class="badge-item"><img src="' + data.badges[i].src + '" alt="" /><div class="tooltip tooltip-up">' + data.badges[i].tooltip + '</div></div>';
    };
    document.getElementById('role-list').innerHTML = rolelist;
    document.getElementById('badge-container').innerHTML = badgelist;
    document.getElementById("discorduser.name").innerHTML = data.default_username + "<span>#" + data.default_tag + "</span>";
    document.getElementById("discorduser.aboutme").innerHTML = data.about_me;
    document.getElementById("discorduser.banner").innerHTML = "<div class='banner-img' style='background: url(\"https://dcdn.dstn.to/banners/" + data.userid + "\")'></div>";
    document.getElementById("discorduser.avatarlink").innerHTML = '<a href="https://discord.com/users/' + data.userid + '" target="_blank"><div id="discorduser.avatar" class="profil-logo"><img src="https://dcdn.dstn.to/avatars/' + data.userid + '" /></div></a>';
    document.getElementById('guild').value = data.message_guild_id;
    document.getElementById('avatar_url').value = data.message_source_icon;
    document.getElementById('username').value = data.message_source_name;
})
const userID = "209275429205311489";
updatepresenceLoop();
lanyard({
    userId: userID,
    socket: true,
    onPresenceUpdate: updateprofile
})

function updateprofile(data) {
    sessionStorage.setItem("activityData", JSON.stringify(data));
    document.getElementById("discorduser.name").innerHTML = `${data.discord_user.display_name}`;
    document.getElementById("discorduser.handle").innerHTML = `${data.discord_user.username}`;
    if (data.active_on_discord_desktop) {
        document.getElementById("discorduser.desktop").innerHTML = `<div class="status-item"><i style="color:` + (data.discord_status === `online` ? `#3ba55d` : (data.discord_status === `idle` ? `#faa81a` : `#ED4245`)) + `;" class="fa-solid fa-display"></i>
                <div class="tooltip tooltip-up">` + (data.discord_status === `online` ? `Online` : (data.discord_status === `idle` ? `Idle` : `DND`)) + ` on Desktop</div></div>`;
    } else {
        document.getElementById("discorduser.desktop").innerHTML = ``;
    }
    if (data.active_on_discord_mobile) {
        document.getElementById("discorduser.mobile").innerHTML = `<div class="status-item"><i style="color:` + (data.discord_status === `online` ? `#3ba55d` : (data.discord_status === `idle` ? `#faa81a` : `#ED4245`)) + `;" class="fa-solid fa-mobile"></i>
                <div class="tooltip tooltip-up">` + (data.discord_status === `online` ? `Online` : (data.discord_status === `idle` ? `Idle` : `DND`)) + ` on Mobile</div></div>`;
    } else {
        document.getElementById("discorduser.mobile").innerHTML = ``;
    }
    if (data.active_on_discord_web) {
        document.getElementById("discorduser.web").innerHTML = `<div class="status-item"><i style="color:` + (data.discord_status === `online` ? `#3ba55d` : (data.discord_status === `idle` ? `#faa81a` : `#ED4245`)) + `;" class="fa-solid fa-globe"></i>
                <div class="tooltip tooltip-up">` + (data.discord_status === `online` ? `Online` : (data.discord_status === `idle` ? `Idle` : `DND`)) + ` on Browser</div></div>`;
    } else {
        document.getElementById("discorduser.web").innerHTML = ``;
    }
    if (data.discord_status === `offline`) {
        document.getElementById("discorduser.desktop").innerHTML = `<div class="status-item"><i style="color:#747f8d;" class="fa-solid fa-circle"></i>
                <div class="tooltip tooltip-up">Offline</div></div>`;
    }

    if (data.activities[0].id === `custom`) {
        document.getElementById("discorduser.status").innerHTML = (data.activities[0].state == undefined ? `` : data.activities[0].state) + `<br><br>`;
        if (data.activities[0].emoji.animated === false) {
            document.getElementById("discorduser.emoji").innerHTML = `<img src="https://cdn.discordapp.com/emojis/${data.activities[0].emoji.id}.webp" width="15"> `;
        } else if (data.activities[0].emoji.animated === true) {
            document.getElementById("discorduser.emoji").innerHTML = `<img src="https://cdn.discordapp.com/emojis/${data.activities[0].emoji.id}.gif?size=40" width="15"> `;
        } else {
            document.getElementById("discorduser.emoji").innerHTML = `${data.activities[0].emoji.name} `;
        }
    }
}
