from predict_eth.helpers import *
from eth_account.account import Account

account1 = Account.create()
account2 = Account.create()

print(f"""
REMOTE_TEST_PRIVATE_KEY1={account1.key.hex()}, ADDRESS1={account1.address}
REMOTE_TEST_PRIVATE_KEY2={account2.key.hex()}, ADDRESS2={account2.address}
""")

url = "https://arweave.net/qctEbPb3CjvU8LmV3G_mynX74eCxo1domFQIlOBH1xU"
""" 
name = "ETH predictions " + str(time.time()) #time for unique name
(data_nft, datatoken, ddo) = ocean.assets.create_url_asset(name, url, {"from":alice}, wait_for_aqua=False)
metadata_state = 5
data_nft.setMetaDataState(metadata_state, {"from":alice})
print(f"New asset created, with did={ddo.did}, and datatoken.address={datatoken.address}")
 """