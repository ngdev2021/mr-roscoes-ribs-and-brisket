import requests
import json

# get Your Google Custom Search API key from .env file
API_KEY = 'AIzaSyDgRHi2CL-QLh9HGXUrUtjw7LzZj4Y3IZY'
# Your search engine ID from .env file
SEARCH_ENGINE_ID = '91299dcd123ca4e79'

# List of menu items
menu_items = [
    'Ribs', 'Brisket', 'Smoked Chicken', 'Pulled Pork', 'Smoked Sausage', 
    'Smoked Turkey Legs', 'Burnt Ends', 'Brisket Mac and Cheese', 'Cornbread', 
    'Cole Slaw', 'Potato Salad', 'Baked Beans', 'Collard Greens', 
    'Banana Pudding', 'Peach Cobbler', 'Sweet Tea', 'Lemonade', 
    'Beer', 'Wine', 'Soda'
]

def search_image(query):
    url = f"https://www.googleapis.com/customsearch/v1?q={query}&cx={SEARCH_ENGINE_ID}&key={API_KEY}&searchType=image"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if 'items' in data:
            return data['items'][0]['link']
        else:
            return None
    else:
        print(f"Error: {response.status_code}")
        return None

def main():
    for item in menu_items:
        print(f"Searching image for: {item}")
        image_url = search_image(item)
        if image_url:
            print(f"Image URL for {item}: {image_url}")
        else:
            print(f"No image found for {item}")

if __name__ == "__main__":
    main()
