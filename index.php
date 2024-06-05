<?php

if (isset($_POST['Name'])) {
    $host = "";
     $user = "";
     $pas = "";
     $db = "";

    $con = mysqli_connect($host, $user, $pas, $db);
if ($con == null) {
            die("Can not connect.");
        }
    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $number = $_POST['mobile'];

    $sql = "INSERT INTO `detail` (`name`, `email`, `mobile`,`Date`,`site`) VALUES ('$name', '$email', '$number',CURRENT_DATE(),'sarthak.thetechocean.me');";

    if ($con->query($sql) == true) {
        echo "<script>alert('Message Send Successfuly');</script>";
//    echo 'messge send succusfully.....';
    }else{
        echo "<script>alert('Message Sending fail..');</script>";
        $con->error;
    }
    $con->close();
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="google-site-verification" content="zxrqZF8F8fAfJINmlqNQwfIZYL5RvazcS5PwhezpULQ" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="title" content="Sarthak Patel | Software Engineer">
    <meta name="description"
        content="a portfolio to showcase my experience, education, skill-set, projects, certificates, achievements and recommendations.">
    <meta name="keywords"
        content="software engineer,sarthak patel,Sarthak Patel,sarthakpatel,javascript developer,sarthak developer,sarthak Javascript developer,PHP developer,Web developer, full stack developer,sarthak1315">
    <meta name="robots" content="index, follow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
    <meta name="revisit-after" content="1 days">
    <meta name="author" content="Sarthak Patel">
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://sarthak.thetechocean.me/" />
    <meta property="og:description"
        content="a webpage to showcase my experience, education, skill-set, projects, certificates, achievements and recommendations." />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta name="theme-color" content="#fff" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sarthak Patel</title>
    <script src="https://kit.fontawesome.com/e674bba739.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <section id="header_in">
        <div class="navbar-title">
            <h3 class="title-first-name">
                Sarthak
            </h3>
            <h3 class="title-last-name">
                Patel
            </h3>
        </div>
        <div id="n_div">
            <ul class="navbar-menu">
                <li><a class="active" href="#">&lt; Home &gt;</a></li>
                <li><a class="" href="#introduction">Service</a></li>
                <li><a class="" href="#techno">Technology</a></li>
                <li><a class="" href="#latest-works">Works</a></li>
                <li><a class="" href="#footer">Contacts</a></li>
            </ul>
        </div>
        <div>
            <ul class="social-media">
                <li>
                    <i class="fa-brands fa-linkedin-in"></i>
                    <a href="https://www.linkedin.com/in/sarthak-patel-sp1315/" target="_blank">LinkedIn</a>
                </li>
                <li>
                    <i class="fa-brands fa-github"></i>
                    <a href="https://github.com/Sarthak1315/" target="_blank">Github</a>
                </li>
                <li>
                    <i class="fa-regular fa-envelope"></i>
                    <a href="mailto:work.sarthakpatel@gmail.com">Email</a>
                </li>
            </ul>
        </div>
    </section>
    <section id="content-body">
        <div class="body-part-1">
            <div class="developer-intro">
                <p>Web Developer</p>
                <p>Cybersecurity Analyst</p>
                <p>Backend Developer</p>

            </div>
            <div class="body-title">
                <!-- <h1>Talk is cheap<br>Show me the code</h1> -->
                <h1>Crafting Digital Dreams:<br>Coding,Security, and Beyond</h1>
                <p>I design and code beautifully simple things,<br>and I love what I do.</p>
                <a href="#footer">LET'S CHAT!</a>
         
                <?php 

                    // echo "<h2>Value is: </h2>";
                    // print_r($_COOKIE["user"]);
                ?>
                
            </div>
            <div class="body-tail">
                <h1>1</h1>
                <p>YEARS<br>EXPERIENCE</p>
                <h1>2</h1>
                <p>PROJECTS<br>COMPLETED</p>
            </div>
        </div>
        <div class="body-part-2">
            <div class="hoodie-guy-animation-class">
                <div class="hoodie-guy"></div>
                <!-- <div class="circle">
                    <span style="--i:1;"><img src="assets/SVGIcons/flutter.svg" height="75px"></span>
                    <span style="--i:2;"><img src="assets/SVGIcons/python.svg" height="75px"></span>
                    <span style="--i:3;"><img src="assets/SVGIcons/adobe-photoshop.svg" height="75px"></span>
                    <span style="--i:4;"><img src="assets/SVGIcons/django.svg" height="75px"></span>
                    <span style="--i:5;"><img src="assets/SVGIcons/adobe-premiere-pro.svg" height="75px"></span>
                    <span style="--i:6;"><img src="assets/SVGIcons/html-5.svg" height="70px"></span>
                    <span style="--i:7;"><img src="assets/SVGIcons/figma.svg" height="75px"></span>
                    <span style="--i:8;"><img src="assets/SVGIcons/css3.svg" height="70px"></span>
                    <span style="--i:9;"><img src="assets/SVGIcons/javascript.svg" height="75px"></span>
                    <span style="--i:10;"><img src="assets/SVGIcons/adobe-illustrator.svg" height="75px"></span>
                    <span style="--i:11;"><img src="assets/SVGIcons/dart.svg" height="75px"></span>
                    <span style="--i:12;"><img src="assets/SVGIcons/PostgreSQL-Dark.svg" height="75px"></span>
                    <span style="--i:13;"><img src="assets/SVGIcons/MySQL-Dark.svg" height="75px"></span>
                    <span style="--i:14;"><img src="assets/SVGIcons/Firebase-Dark.svg" height="75px"></span>
                    <span style="--i:15;"><img src="assets/SVGIcons/Github-Dark.svg" height="75px"></span>
                </div> -->
            </div>  
            <div class="background-circle"></div>
        </div> 
    </section>
    <section id="introduction">
        <div class="cards">
            <div class="design-card active">
                <div>
                    <h3>UI/UX Design</h3>
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <p>Create design products with unique ideas that matters</p>
                <a href="">2 PROJECTS</a>
            </div>
            <div class="design-card">
                <div>
                    <h3>Frontend Development</h3>
                    <i class="fa-solid fa-code"></i>
                </div>
                <p>Making the Web Look Good</p>
                <a href="">2 PROJECTS</a>
            </div>
            <div class="design-card">
                <div>
                    <h3>Backend Development</h3>
                    <i class="fa-solid fa-terminal"></i>
                </div>
                <p>Building the Web’s Backbone</p>
                <a href="">2 PROJECTS</a>
            </div>
        </div>
        <div class="introduction-text">
            <p>Introduction</p>
            <h2>Hello! I'm Sarthak Patel</h2>
            <h4>Crafting User Experiences that Delight and Inspire</h4>
            <p>I am a UI/UX designer who loves to create engaging and delightful user experiences for web and mobile
                applications. I use my skills in user research, design thinking, and prototyping to craft interfaces
                that are not only aesthetically pleasing, but also easy to use and navigate. Making it a very smooth and
                delightful experience for the clients</p>
        </div>
        <div class="introduction-text" style="display: none;">
            <p>Introduction</p>
            <h2>Hello! I'm Sarthak Patel</h2>
            <h4> The Web’s & Mobile’s Magician</h4>
            <p>As a frontend developer, I create stunning and responsive web pages that capture the attention and
                imagination of the users. I use my skills in HTML, CSS, JavaScript, and various frameworks and libraries
                to design and implement user interfaces that are both visually appealing and user-friendly.</p>
        </div>
        <div class="introduction-text" style="display: none;">
            <p>Introduction</p>
            <h2>Hello! I'm Sarthak Patel</h2>
            <h4>Coding with Efficiency</h4>
            <p>As a backend developer, I create robust and scalable web applications that handle the logic and data
                behind the scenes. I use my skills in PHP, JavaScript, MYSQL, and various tools Like Sweetalert2 to develop and
                deploy backend systems that are secure, reliable, and efficient.</p>
        </div>
    </section>
    <section id="techno">
        <div class="testimonial-title">
            <h2>Technology</h2>
            <p>technology/Language Knowledge</p>
        </div>
        <!-- <div class="testimonial-card">
            <div class="star-rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <p>5.0 Rating</p>
            </div>
            <h4>Tanmoy was a real pleasure to work with and we look forward to working with him again. He's definitely
                the kind designer you can trust with a project from start to finish</h4>
            <i class="fa-solid fa-quote-right"></i>
        </div>
        <div class="testimonial-card" style="display: none;">
            <div class="star-rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <p>4.5 Rating</p>
            </div>
            <h4>Working with Tanmoy was a pleasure. Their expertise in both design
                and development allowed them to create a website that exceeded our expectations. We couldn't be happier
                with the end result.</h4>
            <i class="fa-solid fa-quote-right"></i>
        </div>
        <div class="testimonial-card" style="display: none;">
            <div class="star-rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <p>4.0 Rating</p>
            </div>
            <h4>I highly recommend Tanmoy for any design or development project.
                They have the skills, experience, and passion to create stunning, functional solutions that will take
                your business to the next level.</h4>
            <i class="fa-solid fa-quote-right"></i>
        </div>
        <div class="client-profile-card">
            <div class="single-profile-card profile-card-active">
                <img src="assets/client-profile.png" alt="">
                <div>
                    <h4>Sarthak Patel</h4>
                    <p>VP & Co-Founder, <a href="">Wiser</a></p>
                </div>
            </div>
            <div class="single-profile-card">
                <img src="assets/client-profile.png" alt="">
                <div>
                    <h4>Sarthak Patel</h4>
                    <p>VP & Co-Founder, <a href="">Wiser</a></p>
                </div>
            </div>
            <div class="single-profile-card">
                <img src="assets/client-profile.png" alt="">
                <div>
                    <h4>Sarthak Patel</h4>
                    <p>VP & Co-Founder, <a href="">Wiser</a></p>
                </div>
            </div>

        </div> --><br>
        <div class="testimonial-title">
            <p>Languages</p>
        </div>
        <div class="">
                    <span style="--i:1;"><img src="assets/SVGIcons/html-5.svg" class="t_img"></span>
                    <span style="--i:2;"><img src="assets/SVGIcons/css3.svg" class="t_img"></span>
                    <span style="--i:3;"><img src="assets/SVGIcons/javascript.svg" class="t_img"></span>
                    <span style="--i:4;"><img src="assets/SVGIcons/python.svg" class="t_img"></span>
                    <span style="--i:5;"><img src="assets/SVGIcons/java.svg" class="t_img"></span>
                    <span style="--i:6;"><img src="assets/SVGIcons/php-icon.svg" class="t_img"></span>
                    <span style="--i:7;"><img src="assets/SVGIcons/C_Programming_Language.svg" class="t_img"></span>
                    <span style="--i:8;"><img src="assets/SVGIcons/Logo_C_sharp.svg" class="t_img"></span>
        </div><br>
        <div class="testimonial-title">
            <p>Framework</p>
        </div>
        <div class="">
                    <span style="--i:9;"><img src="assets/SVGIcons/aspnet-svgrepo-com.svg" class="t_img"></span>
                    <span style="--i:10;"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" class="t_img"></span>
                    <span style="--i:7;"><img src="https://storage.googleapis.com/myuploads-ad647.appspot.com/icons8-express-js.svg" class="t_img"></span>
                    <span style="--i:7;"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" class="t_img"/></span>
                    <span style="--i:7;"><img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"class="t_img"/></span>
        </div><br>
        <div class="testimonial-title">
            <p>Database</p>
        </div>
        <div class="">
            <span style="--i:11;"><img src="assets/SVGIcons/phpmyadmin-ar21.svg" class="t_img"></span>
            <span style="--i:12;"><img src="assets/SVGIcons/oracle-ar21.svg" class="t_img"></span>
            <span style="--i:13;"><img src="assets/SVGIcons/MySQL-Dark.svg" class="t_img"></span>
            <span style="--i:14;"><img src="https://storage.googleapis.com/myuploads-ad647.appspot.com/mongodb-ar21.svg" class="t_img"></span>
        </div><br>
        <div class="testimonial-title">
            <p>Cloud</p>
        </div>
        <div class="">
            <span style="--i:15;"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" class="t_img"></span>
            <span style="--i:16;"><img src="assets/SVGIcons/Firebase-Dark.svg" class="t_img"></span>
            <span style="--i:17;"><img src="assets/SVGIcons/cloudflare-svgrepo-com.svg" class="t_img"></span>
            <span style="--i:18;"><img src="assets/SVGIcons/Github-Dark.svg" class="t_img"></span>    
            <span style="--i:19;"><img src="assets/SVGIcons/oracle-ar21.svg" class="t_img"></span>
            <span style="--i:20;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" class="t_img"></span>
            
        </div><br>
        <div class="testimonial-title">
            <p>Other</p>
        </div>
        <div class="">
            <span style="--i:21;"><img src="assets/SVGIcons/adobe-illustrator.svg" class="t_img"></span>
            <span style="--i:22;"><img src="assets/SVGIcons/adobe-photoshop.svg" class="t_img"></span>
            <span style="--i:23;"><img src="assets/SVGIcons/canva-icon.svg" class="t_img"></span>
            <span style="--i:23;"><img src="assets/SVGIcons/figma.svg" class="t_img"></span>
            
        </div><br><br>
                
    </section>
    <section id="achievement">
        <div class="testimonial-title">
            <h2>Achievement</h2>
            <p>Certificates</p>
        </div>
        <br>
        <div class="">
            <p align="left" style="text-decoration: none;">
            <img src="https://storage.googleapis.com/myuploads-ad647.appspot.com/Certificate/introduction-to-cybersecurity-tools-cyber-attacks.png" alt="cybersecurity-roles-processes-operating-system-security" width="250" height="250"/>&ensp;
            <img src="https://storage.googleapis.com/myuploads-ad647.appspot.com/Certificate/cybersecurity-roles-processes-operating-system-security.png" alt="cybersecurity-roles-processes-operating-system-security" width="250" height="250"/>&ensp;
            </p>
            <ul>
                <li><a href="https://coursera.org/share/e8dd004130f04f0246db18396139324a" class="link">Introduction to Cybersecurity Tools & Cyber Attacks (IBM) </a></li>
                <li><a href="https://www.hackerrank.com/certificates/c0f37f3be8f3" class="link">JAVA</a></li>
                <li><a href="https://www.hackerrank.com/certificates/85a0b9de980f" class="link">SQL</a></li>
                <li><a href="https://www.hackerrank.com/certificates/0e09f5cea373" class="link">PYTHON</a></li>
            </ul><br>
            <div class="all-projects">
                <a href="">
                    <h3>ALL Certificates</h3>
                </a>
                <p>All Certificates are in the showcase <br> if you want to <a href="https://sarthak.thetechocean.me/certificates.html">see more.</a>
                </p>
            </div>
        </div>
    </section>

    <section id="latest-works">
        <div class="left-project">
            <div class="latest-work-title">
                <h3>Latest Works</h3>
                <p>Perfect solutions for digital experience</p>
            </div>

            <div class="project-card project-card-2">
                <div class="title">
                    <h3>Nsaver</h3>
                    <div class="tech-stack">
                        <p>PHP</p>
                        <p>JavaScript</p>
                        <p>phpmyadmin</p>
                    </div>
                </div>
                <a href="https://note.thetechocean.me/" target="_blank">
                <img src="assets/Projects/p2.png" alt="" class="project-img-2">
                </a>
            </div>

            <div class="all-projects">
                <a href="#latest-works">
                    <h3>ALL PROJECTS</h3>
                </a>
                <p>* projects are publish in Github <br>if you want to <a href="https://github.com/Sarthak1315/">see more.</a>
                </p>
            </div>
        </div>
        <div class="right-project">
            <div class="project-card project-card-1">
                <div class="title">
                    <h3>MyUploads</h3>
                    <div class="tech-stack">
                        <p>PHP</p>
                        <p>JavaScript</p>
                        <p>phpmyadmin</p>
                    </div>
                </div>
                <a href="https://myuploads.thetechocean.me/" target="_blank">
                <img src="assets/Projects/p1.png" alt="" class="project-img-2">
                </a>
            </div>
            <!-- <div class="project-card project-card-3">
                <div class="title">
                    <h3>Focus</h3>
                    <div class="tech-stack">
                        <p>PHP</p>
                        <p>JavaScript</p>
                        <p>phpmyadmin</p>
                    </div>
                </div>
                <img src="assets/Projects/project-3.png" alt="" class="project-img-3">
            </div> -->
        </div>
    </section>
    
    <section id="footer">
        <div class="footer-left">
            <h2>Let's make something amazing together</h2>
<form action="" method="post">
            <div class="email-form">
                <h2>Start by <span>saying hi</span></h2>
                
                <input type="text" name="Name" id="" placeholder="Your name">
                <input type="email" name="Email" id="" placeholder="Email Address">
                <div>
                    <input type="number" name="mobile" id="" placeholder="Phone number">
                    <button type="submit" name="sub">Send</button>
                </div>
                
            </div>
</form>
            <div class="footer-title">
                <h3 class="title-first-name">
                    Sarthak
                </h3>
                <h3 class="title-last-name">
                    Patel
                </h3>
            </div>
        </div>
        <div class="footer-right">
            <div class="footer-email-intro">
                <p>Information</p>
                <h6>Surat, Gujarat, India, Pin-395006</h6>
                <h3>work.sarthakpatel@gmail.com</h3>
            </div>
            <div class="footer-nav-menu">
                <ul class="footer-menu">
                    <li><a class="" href="#">&lt; Home &gt;</a></li>
                    <li><a class="" href="#introduction">Service</a></li>
                    <li><a class="" href="#techno">Technology</a></li>
                    <li><a class="" href="#latest-works">Works</a></li>
                    <li><a class="" href="#footer">Contacts</a></li>
                </ul>
            </div>
            <div class="social-icons">
                <a href="https://www.linkedin.com/in/sarthak-patel-sp1315/" target="_blank">
                    <i class="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://github.com/Sarthak1315/" target="_blank">
                    <i class="fa-brands fa-github"></i>
                </a>
                <a href="mailto:work.sarthakpatel@gmail.com" target="_blank">
                    <i class="fa-regular fa-envelope"></i>
                </a>
                <a href="" target="_blank">
                    <i class="fa-brands fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/___sarthak_13/" target="_blank">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100016049311114" target="_blank">
                    <i class="fa-brands fa-facebook"></i>
                </a>
            </div>
        </div>
    </section>
    <script src="script.js"></script>
</body>

</html>
