from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

from xvfbwrapper import Xvfb

import os
import traceback
import time

vdisplay = Xvfb()
vdisplay.start()
cwd = os.getcwd()
os.environ['PATH'] = os.environ["PATH"] + ':' + cwd + '/driver'
# host = "hacktory.lab"
host = "62.84.113.204"

def go_routes(routes, browser):
    for i in range(routes):
        print(f'On the route: {f"http://{host}/posts/{i+1}"}')
        browser.get(f"http://{host}/posts/{i+1}")
        try:
            WebDriverWait(browser, 1.5).until(EC.alert_is_present())
            alert = browser.switch_to.alert
            alert.accept()
            print('alert accepted')
        except TimeoutException:
            print('alert not accepted')
            pass
        time.sleep(1)

def auth(browser, route, logininfo, passwordinfo, buttonid):
    browser.get(f"http://{host}{route}")
    time.sleep(5)
    browser.find_element(By.ID, logininfo[0]).send_keys(logininfo[1])
    browser.find_element(By.ID, passwordinfo[0]).send_keys(passwordinfo[1])
    browser.find_element(By.ID, buttonid).click()
    return browser


try: 
    options = Options()
    options.headless = True
    # options.add_argument("--disable-setuid-sandbox")
    # options.add_argument('--no-sandbox')
    browser = webdriver.Chrome(options=options, executable_path='./driver/chromedriver')
    # browser = webdriver.Chrome(executable_path='./driver/chromedriver')
    browser = auth(
        browser, 
        '/login/signin', 
        [':r0:', 'admin'], 
        [':r1:', '1234567qwe'], 
        'login_button'
    )
    browser.get(f"http://{host}")
    time.sleep(5)
    maxArticles = len(browser.find_elements(By.TAG_NAME, 'article'))
    try:
        while True:
            go_routes(maxArticles, browser)
            time.sleep(15)
    except Exception as e:
        print(traceback.format_exc())
        os.environ['PATH'] = os.environ["PATH"][:-(len(cwd + '/driver')+1)]
        exit(0)


except Exception as e:
    print(traceback.format_exc())
    os.environ['PATH'] = os.environ["PATH"][:-(len(cwd + '/driver')+1)]
    exit(0)
