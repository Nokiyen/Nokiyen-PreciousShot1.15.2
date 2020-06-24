package noki.preciousshot.resource;

import com.google.common.collect.ImmutableSet;
import net.minecraft.resources.IResourcePack;
import net.minecraft.resources.ResourcePackType;
import net.minecraft.resources.data.IMetadataSectionSerializer;
import net.minecraft.util.ResourceLocation;

import javax.annotation.Nullable;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Set;
import java.util.function.Predicate;


/**********
 * @class ScreenShotsResourcePack
 *
 * @description screenshotsフォルダを、リソースパックとして扱うためのクラスです。
 * これにより、screenshotsフォルダ内の画像に対してResourceLocationを使うことができます。
 * @descriptoin_en 
 */
public class ScreenShotsResourcePack implements IResourcePack {
	
	//******************************//
	// define member variables.
	//******************************//
	private static final Set<String> resourceDomains = ImmutableSet.of("ps_screenshots");
	private File screenshotsDirectory;
	
	
	//******************************//
	// define member methods.
	//******************************//
	public ScreenShotsResourcePack(File directory) {
		
		this.screenshotsDirectory = directory;
		
	}
	
/*	@Override
	public InputStream getInputStream(ResourceLocation location) throws IOException {
		
		return new FileInputStream(new File(this.screenshotsDirectory, location.getResourcePath()));
		
	}
	
	@Override
	public boolean resourceExists(ResourceLocation location) {
		
		return new File(this.screenshotsDirectory, location.getResourcePath()).exists();
		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Set getResourceDomains() {
		
		return resourceDomains;
		
	}
	
	@Override
	public BufferedImage getPackImage() throws IOException {
		
		return null;
		
	}

	@Override
	public String getPackName() {
		
		return (String)resourceDomains.toArray()[0];
		
	}

	@Override
	public <T extends IMetadataSection> T getPackMetadata(MetadataSerializer metadataSerializer, String metadataSectionName)
			throws IOException {
		return null;
	}*/

	@Override
	public InputStream getRootResourceStream(String fileName) throws IOException {
		return null;
	}

	@Override
	public InputStream getResourceStream(ResourcePackType type, ResourceLocation location) throws IOException {
		return null;
	}

	@Override
	public Collection<ResourceLocation> getAllResourceLocations(ResourcePackType type, String namespaceIn, String pathIn, int maxDepthIn, Predicate<String> filterIn) {
		return null;
	}

	@Override
	public boolean resourceExists(ResourcePackType type, ResourceLocation location) {
		return false;
	}

	@Override
	public Set<String> getResourceNamespaces(ResourcePackType type) {
		return null;
	}

	@Nullable
	@Override
	public <T> T getMetadata(IMetadataSectionSerializer<T> deserializer) throws IOException {
		return null;
	}

	@Override
	public String getName() {
		return null;
	}

	@Override
	public void close() throws IOException {

	}
}
