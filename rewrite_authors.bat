@echo off
rem = """
echo Installing git-filter-repo...
pip3 install git-filter-repo

echo Rewriting authors...
set "SCRIPT_PATH=%~f0"
git filter-repo --force --commit-callback "import os; code = open(os.environ['SCRIPT_PATH'], 'r', encoding='utf-8').read().split('\"\"\"', 2)[2]; exec(code)"

echo.
echo Done! Now run:
echo   git push origin main --force-with-lease
exit /b
"""

AUTHOR_MAP = {
    b"a58cc5d": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"ab6867c": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"d510383": (b"Ayodeji Feranmi Adebowale", b"adebowaleferanmi1@gmail.com"),
    b"ba87256": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"4961b59": (b"Izuchukwu Munachi Delight Chiamaka", b"munachiizuchukwu2k24@gmail.com"),
    b"120d267": (b"Izuchukwu Munachi Delight Chiamaka", b"munachiizuchukwu2k24@gmail.com"),
    b"f690b19": (b"Adesegun Martins Samad", b"adesegunmartins2@gmail.com"),
    b"c5f42df": (b"Chukwudumebi Offor Gerard Mario", b"offordumebi5@gmail.com"),
    b"9729e9b": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"36dcf17": (b"Izuchukwu Munachi Delight Chiamaka", b"munachiizuchukwu2k24@gmail.com"),
    b"d445aff": (b"Adesegun Martins Samad", b"adesegunmartins2@gmail.com"),
    b"dab4ec2": (b"Chukwudumebi Offor Gerard Mario", b"offordumebi5@gmail.com"),
    b"2eeddd2": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"f3a1e50": (b"Ayodeji Feranmi Adebowale", b"adebowaleferanmi1@gmail.com"),
    b"e1e551f": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"c10bc2f": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"694b220": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"5acde2c": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"71ed494": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"17d2826": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"6d558df": (b"Izuchukwu Munachi Delight Chiamaka", b"munachiizuchukwu2k24@gmail.com"),
    b"b221971": (b"Adesegun Martins Samad", b"adesegunmartins2@gmail.com"),
    b"0632290": (b"Chukwudumebi Offor Gerard Mario", b"offordumebi5@gmail.com"),
    b"823ed0e": (b"Ayodeji Feranmi Adebowale", b"adebowaleferanmi1@gmail.com"),
    b"92e6363": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"fd905f6": (b"Ayodeji Feranmi Adebowale", b"adebowaleferanmi1@gmail.com"),
    b"b6d5f76": (b"Chukwudumebi Offor Gerard Mario", b"offordumebi5@gmail.com"),
    b"1375184": (b"Chukwudumebi Offor Gerard Mario", b"offordumebi5@gmail.com"),
    b"e6a293e": (b"Olawunmi Oluwajomiloju Gerrard", b"olawunmigerrard@gmail.com"),
    b"38b2c74": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"e418a39": (b"Ayodeji Feranmi Adebowale", b"adebowaleferanmi1@gmail.com"),
    b"0b0c598": (b"Olawunmi Oluwajomiloju Gerrard", b"olawunmigerrard@gmail.com"),
    b"379a96a": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"b158269": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"3187a25": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"ec61fb4": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"b6cf8d0": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"2e14aee": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"f82bc86": (b"Adesegun Martins Samad", b"adesegunmartins2@gmail.com"),
    b"2c1e9d7": (b"Adesegun Martins Samad", b"adesegunmartins2@gmail.com"),
    b"03aff3e": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"f1e5cfd": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"984c458": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"4778639": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"09604ff": (b"Chukwudumebi Offor Gerard Mario", b"offordumebi5@gmail.com"),
    b"18b1f27": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"f623db3": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"0979016": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"c9b54b6": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"1cf30ca": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"677eb0b": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"03ab21a": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
    b"d1e261b": (b"Udunna Yoanna Juochi", b"terryyoan@gmail.com"),
}

short_id = commit.original_id[:7]
if short_id in AUTHOR_MAP:
    name, email = AUTHOR_MAP[short_id]
    commit.author_name = name
    commit.author_email = email
    commit.committer_name = name
    commit.committer_email = email
