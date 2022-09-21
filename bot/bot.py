from selenium import webdriver
from selenium.webdriver.common.by import By
import os
import traceback
import time

cwd = os.getcwd()
os.environ['PATH'] = os.environ["PATH"] + ':' + cwd
host = "localhost:5000"

def go_routes(routes, browser):
    for i in range(routes):
        browser.get(f"http://{host}/posts/{i+1}")


try: 
    options = webdriver.FirefoxOptions()
    options.add_argument('--headless')
    options.add_argument("--disable-setuid-sandbox")
    options.add_argument('--no-sandbox')
    browser = webdriver.Firefox(options=options)
    browser.get(f"http://{host}/login/signin")
    browser.find_element(By.ID, ":r0:").send_keys("admin")
    browser.find_element(By.ID, ":r1:").send_keys('1234567qwe')
    browser.find_element(By.ID, 'login_button').click()
    maxArticles = len(browser.find_elements(By.TAG_NAME, 'article'))
    try:
        while True:
            go_routes(maxArticles, browser)
            time.sleep(15)
    except Exception as e:
        print(traceback.format_exc())
        os.environ['PATH'] = os.environ["PATH"][:-(len(cwd)+1)]
        exit(0)


except Exception as e:
    print(traceback.format_exc())
    os.environ['PATH'] = os.environ["PATH"][:-(len(cwd)+1)]
    exit(0)

os.environ['PATH'] = os.environ["PATH"][:-(len(cwd)+1)]